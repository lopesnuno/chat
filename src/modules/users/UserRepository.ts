import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import User from './UserModel';


@Service()
export default class UserRepository implements Repository<User> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {
  }

  async get(id: string): Promise<User | null> {
    const { rows, rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
          SELECT *
          FROM users
          WHERE id = ${id};
      `)
    );

    if (rowCount === 0) {
      return null;
    }
    const user = rows[0];

    return new User(user.id, user.name, new Date(user.created_at as number), new Date(user.updated_at as number));
  }

  async update(user: User): Promise<boolean> {
    const id = user.id;
    const name = user.name;

    const { rowCount } = await this.db.connect((connection) =>
        connection.query(sql`
          UPDATE users
          SET name = ${name},
              updated_at = current_timestamp
          WHERE id = ${id};
        `)
    );

    return rowCount === 1;
  }


  async create(user: User): Promise<User> {
    const name = user.name;
    const id = user.id;
    const { rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
          INSERT INTO users(id, name, created_at, updated_at)
          VALUES (${id}, ${name}, ${user.createdAt.toISOString()}, ${user.updatedAt.toISOString()});
      `)
    );

    if (rowCount === 1) {
      return user;
    }
    throw new Error('Failed to insert user... Unknown error');
  }

  async delete(id: string): Promise<boolean> {
    const { rowCount } = await this.db.connect((connection) =>
        connection.query(sql`
          DELETE
          FROM users
          WHERE id = ${id};
        `)
    );

    return rowCount === 1;
  }
}

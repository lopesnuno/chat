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

  async update(id: string, name: string): Promise<boolean> {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
  create(o: User): Promise<User> {
    return Promise.resolve(undefined);
  }
}

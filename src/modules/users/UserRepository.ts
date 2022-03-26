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

  async create(o: User): Promise<User> {

    return Promise.resolve(o);
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
}



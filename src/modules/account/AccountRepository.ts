import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import Account from './AccountModel';

@Service()
export default class AccountRepository implements Repository<Account> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {
  }

  async create(o: Account): Promise<Account> {
    return Promise.resolve(o);
  }

  async get(id: string): Promise<Account | null> {
    const { rows, rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
          SELECT *
          FROM account
          WHERE id = ${id};
      `)
    );

    if (rowCount === 0) {
      return null;
    }
    const account = rows[0];

    return new Account(account.id, account.name, account.created_at, account._updatedAt);
  }
}

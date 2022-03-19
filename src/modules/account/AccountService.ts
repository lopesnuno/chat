import { Inject, Service } from 'typedi';

import Random from '../../utils/random';

import accountRepository from './AccountRepository';
import account from './AccountModel';


@Service()
export default class AccountService {
  constructor(
    @Inject()
    private repository: accountRepository
  ) {
  }

  public async create(name: string, id?: string): Promise<account> {
    console.log(`Creating account ${id}`);
    return this.repository.create(new account(id ?? Random.id(), name, Date.now(), Date.now()));
  }

  public async get(id: string): Promise<account> {
    console.log(`Getting account ${id}`);
    return this.repository.get(id);
  }

  public async update(
    id: string,
    name: string
  ): Promise<account> {
    console.log(`Updating account ${id}`);
    // TODO
    return new account(id, name, 0, 0);
  }

  public async delete(id: string): Promise<void> {
    console.log(`delete account ${id}`);
    // TODO
  }

  // TODO: public async addMemberToAccount(memberId: string, accountId: string) {}
}

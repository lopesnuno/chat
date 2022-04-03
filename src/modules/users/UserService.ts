import { Inject, Service } from 'typedi';

import UserRepository from './UserRepository';
import User from './UserModel';


import Random from '../../utils/random';

@Service()
export default class UserService {
  constructor(
    @Inject()
    private repository: UserRepository
  ) {
  }

  public async get(id: string): Promise<User> {
    console.log(`Getting user ${id}`);
    return this.repository.get(id);
  }
  public async create(name: string, id: string): Promise<boolean> {
    console.log(`Creating account: `);
    return this.repository.create(name, id ?? Random.id());
  }

  public async update(id: string, name: string): Promise<boolean> {
    console.log(`Updating user ${id}`);
    return this.repository.update(id, name);
  }
}

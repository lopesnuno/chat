import { Inject, Service } from 'typedi';

import UserRepository from './UserRepository';
import User from './UserModel';


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
  public async create(id: string, name: string): Promise<User> {
    console.log(`Creating account: `);
    const user = new User(id, name);
    return this.repository.create(user);
  }

  public async update(id: string, name: string): Promise<boolean> {
    console.log(`Updating user ${id}`);
    return this.repository.update(id, name);
  }
}

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
}

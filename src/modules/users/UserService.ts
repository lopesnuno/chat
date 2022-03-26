import { Inject, Service } from 'typedi';

import Random from '../../utils/random';

import UserRepository from './UserRepository';
import User from './UserModel';


@Service()
export default class UserService {
  constructor(
    @Inject()
    private repository: UserRepository
  ) {
  }

  public async create(name: string, id?: string): Promise<User> {
    console.log(`Creating user ${id}`);
    return this.repository.create(new User(id ?? Random.id(), name, new Date(), new Date()));
  }

  public async get(id: string): Promise<User> {
    console.log(`Getting user ${id}`);
    return this.repository.get(id);
  }

  public async update(
    id: string,
    name: string
  ): Promise<User> {
    console.log(`Updating user ${id}`);
    // TODO
    return new User(id, name, new Date(), new Date());
  }

  public async delete(id: string): Promise<void> {
    console.log(`delete user ${id}`);
    // TODO
  }

  // TODO: public async addMemberToUser(memberId: string, userId: string) {}
}

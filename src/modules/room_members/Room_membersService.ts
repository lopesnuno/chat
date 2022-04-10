import { Inject, Service } from 'typedi';

import Room_membersRepository from './Room_membersRepository';

@Service()
export default class Room_membersService {
  constructor(
    @Inject()
    private repository: Room_membersRepository
  ) {
  }

  public async insert(id: string, roomId: string, userId: string): Promise<boolean> {
    console.log(`Inserting user ${userId} into room ${roomId}`);
    return this.repository.insert(id, roomId, userId);
  }
}

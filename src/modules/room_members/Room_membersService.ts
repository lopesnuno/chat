import { Inject, Service } from 'typedi';

import Room_membersRepository from './Room_membersRepository';
import RoomMembers from "./Room_membersModel";

@Service()
export default class Room_membersService {
  constructor(
    @Inject()
    private repository: Room_membersRepository
  ) {
  }

  public async create(id: string, roomId: string, userId: string): Promise<RoomMembers> {
    console.log(`Inserting user ${userId} into room ${roomId}`);
    const room_members = new RoomMembers(id, roomId, userId)
    return this.repository.create(room_members);
  }
}

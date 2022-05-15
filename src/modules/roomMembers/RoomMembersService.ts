import { Inject, Service } from 'typedi';

import RoomMember from './RoomMembersModel';

import RoomMembersRepository from './RoomMembersRepository';

@Service()
export default class RoomMembersService {
  constructor(
    @Inject()
    private repository: RoomMembersRepository
  ) {
  }

    public async delete(id: string): Promise<boolean> {
        console.log(`Deleting member from room: ${id}`);
        return this.repository.delete(id);
    }

  public async create(id: string, roomId: string, userId: string): Promise<RoomMember> {
    console.log(`Inserting user ${userId} into room ${roomId}`);
    const roomMember = new RoomMember(id, roomId, userId);

    return this.repository.create(roomMember);
  }
}

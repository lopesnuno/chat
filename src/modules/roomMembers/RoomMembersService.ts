import { Inject, Service } from 'typedi';

import RoomMembersRepository from './RoomMembersRepository';
import RoomMember from "./RoomMembersModel";

@Service()
export default class RoomMembersService {
  constructor(
    @Inject()
    private repository: RoomMembersRepository
  ) {
  }

  public async delete(userId: string, roomId: string): Promise<boolean> {
    console.log(`Deleting member from room: ${roomId}`);
    const key = {userId, roomId}
    return this.repository.delete(key);
  }

  public async create(id: string, roomId: string, userId: string): Promise<RoomMember> {
    console.log(`Inserting user ${userId} into room ${roomId}`);
    const roomMember = new RoomMember(id, roomId, userId)
    return this.repository.create(roomMember);
  }
}

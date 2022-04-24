import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import RoomMember from "./RoomMembersModel";

@Service()
export default class RoomMembersRepository implements Repository<RoomMember> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {
  }

  get(id: string): Promise<RoomMember> {
    throw new Error('Method not implemented.');
  }

  update(o: RoomMember): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async create(roomMember: RoomMember): Promise<RoomMember> {
    const id = roomMember.id;
    const roomId = roomMember.roomId;
    const userId = roomMember.userId;

    const {rowCount} = await this.db.connect((connection) =>
        connection.query(sql`
          INSERT INTO room_members(id, joined_at, room_id, user_id)
          VALUES (${id}, ${roomMember.joinedAt.toISOString()}, ${roomId}, ${userId});
        `)
    );

    if (rowCount === 1) return roomMember
    throw new Error('Failed to insert message... Unknown error')
  }
}



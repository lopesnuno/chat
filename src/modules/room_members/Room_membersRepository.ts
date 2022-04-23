import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import RoomMembers from "./Room_membersModel";

@Service()
export default class Room_membersRepository implements Repository<RoomMembers> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {
  }

  get(id: string): Promise<RoomMembers> {
    throw new Error('Method not implemented.');
  }

  update(id: string, name: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async create(room_members: RoomMembers): Promise<RoomMembers> {
    const id = room_members.id;
    const roomId = room_members.roomId;
    const userId = room_members.userId;

    const {rowCount} = await this.db.connect((connection) =>
        connection.query(sql`
          INSERT INTO room_members(id, joined_at, room_id, user_id)
          VALUES (${id}, ${room_members.joinedAt.toISOString()}, ${roomId}, ${userId});
        `)
    );

    if (rowCount === 1) return room_members
    throw new Error('Failed to insert message... Unknown error')
  }
}



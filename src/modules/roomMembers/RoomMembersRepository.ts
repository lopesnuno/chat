import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import RoomMember from './RoomMembersModel';

@Service()
export default class RoomMembersRepository
  implements Repository<RoomMember, { userId: string; roomId: string }>
{
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {}

  get(id: string): Promise<RoomMember> {
    throw new Error(`Method not implemented. ${id}`);
  }

  async list(id: string): Promise<RoomMember[]> {
    const { rows  } = await this.db.connect((connection) =>
        connection.query(sql`
          SELECT *
          FROM room_members
          WHERE room_id = ${id} LIMIT 50;
      `)
    );

    const members = [];

    for(let i = 0; i < rows.length; i++) {
      const obj = rows[i];

      members.push(new RoomMember(obj.id, obj.room_id, obj.user_id, new Date(obj.joined_at as number)));
    }

    return members;
  }

  update(o: RoomMember): Promise<boolean> {
    throw new Error(`Method not implemented. ${o.id}`);
  }

  async delete(key: { userId: string; roomId: string }): Promise<boolean> {
    const { rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
                DELETE
                FROM room_members
                WHERE user_id = ${key.userId}
                  AND room_id = ${key.roomId};
            `)
    );

    return rowCount === 1;
  }

  async create(roomMember: RoomMember): Promise<RoomMember> {
    const id = roomMember.id;
    const roomId = roomMember.roomId;
    const userId = roomMember.userId;

    const { rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
                INSERT INTO room_members(id, joined_at, room_id, user_id)
                VALUES (${id}, ${roomMember.joinedAt.toISOString()}, ${roomId}, ${userId});
            `)
    );

    if (rowCount === 1) {
      return roomMember;
    }
    throw new Error('Failed to insert message... Unknown error');
  }
}

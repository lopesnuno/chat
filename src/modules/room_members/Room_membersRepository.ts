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

  async insert(id: string, roomId: string, userId: string): Promise<boolean> {
    const { rowCount } = await this.db.connect((connection) =>
        connection.query(sql`
          INSERT INTO room_members(id, joined_at, room_id, user_id)
          VALUES(${id}, current_timestamp, ${roomId}, ${userId});
        `)
    );

    return rowCount === 1;
  }
}



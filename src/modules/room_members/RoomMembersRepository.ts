import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import RoomMembers from './RoomMembersModel';

@Service()
export default class RoomMembersRepository implements Repository<RoomMembers> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {
  }

  async create(o: RoomMembers): Promise<RoomMembers> {
    return Promise.resolve(o);
  }

  async get(id: string): Promise<RoomMembers | null> {
    const { rows, rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
          SELECT *
          FROM room
          WHERE id = ${id};
      `)
    );

    if (rowCount === 0) {
      return null;
    }
    const room = rows[0];

    return new RoomMembers(room.id, room.name, room.created_at, room._updatedAt);
  }
}

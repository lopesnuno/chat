import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import Room from './MessageModel';

@Service()
export default class MessageRepository implements Repository<Room> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {
  }

  async create(o: Room): Promise<Room> {
    return Promise.resolve(o);
  }

  async get(id: string): Promise<Room | null> {
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

    return new Room(room.id, room.name, room.created_at, room._updatedAt);
  }
}

import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import Room from './RoomModel';

@Service()
export default class RoomRepository implements Repository<Room> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {
  }


  async get(id: string): Promise<Room | null> {
    const { rows, rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
          SELECT *
          FROM rooms
          WHERE id = ${id};
      `)
    );

    if (rowCount === 0) {
      return null;
    }
    const room = rows[0];

    return new Room(room.id, room.name, new Date(room.created_at as number), new Date(room.updated_at as number));
  }

  async create(room: Room): Promise<Room> {
    const { rowCount } = await this.db.connect((connection) =>
        connection.query(sql`
            INSERT INTO rooms(id, name, created_at, updated_at, owner)
            VALUES(${room.id}, ${room.name}, ${room.createdAt.toISOString()} , ${room.updatedAt.toISOString()}, ${room.owner});
      `)
    );

    if (rowCount === 1) return room;
    throw new Error('Failed to insert room... Unknown error')
  }

  async update(id: string, name: string): Promise<boolean> {
    const { rowCount } = await this.db.connect((connection) =>
        connection.query(sql`
          UPDATE rooms
          SET name = ${name},
              updated_at = current_timestamp
          WHERE id = ${id};
        `)
    );

    return rowCount === 1;
  }
}



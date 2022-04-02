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

  async create(o: Room): Promise<Room> {
    return Promise.resolve(o);
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

  async update(id: string, name: string): Promise<boolean> {
    const { rowCount } = await this.db.connect((connection) =>
        connection.query(sql`
          UPDATE rooms
          SET name = ${name},
              updated_at = current_date
          WHERE id = ${id};
        `)
    );

    return rowCount === 1;
  }
}

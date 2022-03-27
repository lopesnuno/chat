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

  async update(id: string, name: string): Promise<Room> {
    await this.db.connect((connection) =>
        connection.query(sql`
          UPDATE rooms
          SET name = ${name}
          WHERE id = ${id};
        `)
    );

    return new Room(id, name, new Date(), new Date());
  }
}

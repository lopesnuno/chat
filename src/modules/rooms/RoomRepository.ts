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

  async update(id: string, name: string): Promise<Room> {
    await this.db.connect((connection) =>
        connection.query(sql`
          UPDATE rooms
          SET name = ${name}
          WHERE id = ${id};
        `)
    );

    return new Room(id, name, new Date(), new Date());

    /* ERROR:
    * SQL tag cannot be bound an undefined value.
    * at sql (/opt/app/node_modules/slonik/src/factories/createSqlTag.ts:73:13)
    * at /opt/app/src/modules/rooms/RoomRepository.ts:40:29
    * at /opt/app/node_modules/slonik/src/binders/bindPool.ts:79:18
    * at createConnection (/opt/app/node_modules/slonik/src/factories/createConnection.ts:187:20)
    * at processTicksAndRejections (node:internal/process/task_queues:96:5)
    * at async RoomRepository.update (/opt/app/src/modules/rooms/RoomRepository.ts:39:32)
    * at async updateRoom (/opt/app/src/modules/rooms/RoomApi.ts:41:18)
    *
    * */

  }
}

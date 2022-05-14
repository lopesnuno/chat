import { Inject, Service } from 'typedi';

import RoomRepository from './RoomRepository';
import Room from './RoomModel';

@Service()
export default class RoomService {
  constructor(
    @Inject()
    private repository: RoomRepository
  ) {
  }

  public async get(id: string): Promise<Room> {
    console.log(`Getting room ${id}`);
    return this.repository.get(id);
  }

  public async create(id: string, name: string, owner: string): Promise<Room> {
    console.log(`Creating room: `);
    const room = new Room(id, name, owner, new Date(), new Date())
    return this.repository.create(room);
  }

  public async update(id: string, name: string): Promise<boolean> {
    console.log(`Updating room ${id}`);
    const room =  new Room(id, name, new Date());
    return this.repository.update(room);
  }

  public async delete(id: string): Promise<boolean> {
    console.log(`Deleting room ${id}`);
    return this.repository.delete(id);
  }

}

import { Inject, Service } from 'typedi';

import RoomRepository from './RoomRepository';
import Room from './RoomModel';
import Random from '../../utils/random';

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

  public async create(name: string, id: string, owner: string): Promise<boolean> {
    console.log(`Creating room: `);
    return this.repository.create(name, id ?? Random.id(), owner);
  }

  public async update(id: string, name: string): Promise<boolean> {
    console.log(`Updating room ${id}`);
    return this.repository.update(id, name);
  }

}

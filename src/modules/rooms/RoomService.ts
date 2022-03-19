import { Inject, Service } from 'typedi';

import Random from '../../utils/random';

import RoomRepository from './RoomRepository';
import Room from './RoomModel';


@Service()
export default class RoomService {
  constructor(
    @Inject()
    private repository: RoomRepository
  ) {
  }

  public async create(name: string, id?: string): Promise<Room> {
    console.log(`Creating room ${id}`);
    return this.repository.create(new Room(id ?? Random.id(), name, new Date(), new Date()));
  }

  public async get(id: string): Promise<Room> {
    console.log(`Getting room ${id}`);
    return this.repository.get(id);
  }

  public async update(
    id: string,
    name: string
  ): Promise<Room> {
    console.log(`Updating room ${id}`);
    // TODO
    return new Room(id, name, new Date(), new Date());
  }

  public async delete(id: string): Promise<void> {
    console.log(`delete room ${id}`);
    // TODO
  }

  // TODO: public async addMemberToRoom(memberId: string, roomId: string) {}
}

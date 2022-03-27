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

  public async update(id: string, name: string): Promise<Room> {
    console.log(`Updating room ${id}`);
    return this.repository.update(id, name);
  }

}

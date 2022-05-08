import { Inject, Service } from 'typedi';

import RoomMembersRepository from './RoomMembersRepository';

@Service()
export default class RoomMembersService {
    constructor(
        @Inject()
        private repository: RoomMembersRepository
    ) {
    }

    public async delete(id: string): Promise<boolean> {
        console.log(`Deleting member from room: ${id}`);
        return this.repository.delete(id);
    }
}
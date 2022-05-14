import { Inject, Service } from 'typedi';
import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import RoomMember from "./RoomMembersModel";

@Service()
export default class RoomMembersRepository implements Repository<RoomMember> {
    constructor(
        @Inject('db')
        private db: DatabasePool
    ) {
    }

    create(o: RoomMember): Promise<RoomMember> {
        throw new Error('Method not implemented.');
    }

    get(id: string): Promise<RoomMember> {
        throw new Error('Method not implemented.');
    }

    update(o: RoomMember): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    
    async delete(id: string): Promise<boolean> {
        const {rowCount} = await this.db.connect((connection) =>
            connection.query(sql`
                DELETE
                FROM room_members
                WHERE user_id = ${id}
            `)
        );

        return rowCount === 1;
    }
}

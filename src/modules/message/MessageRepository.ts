import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import Message from './MessageModel';

@Service()
export default class MessageRepository implements Repository<Message> {
    constructor(
        @Inject('db')
        private db: DatabasePool
    ) {
    }

    create(o: Message): Promise<Message> {
        throw new Error('Method not implemented.');
    }

    get(id: string): Promise<Message> {
        throw new Error('Method not implemented.');
    }

    update(o: Message): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async delete(id: string): Promise<boolean> {
        const {rowCount} = await this.db.connect((connection) =>
            connection.query(sql`
                DELETE
                FROM messages
                WHERE id = ${id}
            `)
        );

        return rowCount === 1;
    }
}
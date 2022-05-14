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

    async get(id: string): Promise<Message> {
        const { rows, rowCount } = await this.db.connect((connection) =>
            connection.query(sql`
          SELECT *
          FROM messages
          WHERE id = ${id};
      `)
        );

        if (rowCount === 0) {
            return null;
        }
        const message = rows[0];

        return new Message(message.id, message.content, message.senderId, message.recipientId, message.replyTo, message.roomId, new Date(message.sendAt as number));
    }

    update(o: Message): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async create(message: Message): Promise<Message> {
        const id = message.id;
        const content = message.content;
        const senderId = message.senderId;
        const recipientId = message.recipientId;
        const replyTo = message.replyTo;
        const roomId = message.roomId;

        const { rowCount } = await this.db.connect((connection) =>
            connection.query(sql`
          INSERT INTO messages(id, send_at, message, sender_id, recipient_id, reply_to, rooms_id)
          VALUES(${id}, ${message.sendAt.toISOString()}, ${content}, ${senderId}, ${recipientId}, ${replyTo}, ${roomId});
        `)
        );

        if (rowCount === 1) return message
        throw new Error('Failed to insert message... Unknown error')
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
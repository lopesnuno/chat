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

    get(id: string): Promise<Message> {
        throw new Error(`Method not implemented. ${id}`);
    }

    update(o: Message): Promise<boolean> {
      throw new Error(`Method not implemented. ${o.id}`);
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

      if (rowCount === 1) {
        return message;
      }
      throw new Error('Failed to insert message... Unknown error');
    }

    async delete(id: string): Promise<boolean> {
      const { rowCount } = await this.db.connect((connection) =>
        connection.query(sql`
            DELETE
            FROM messages
            WHERE id = ${id}
        `)
      );

        return rowCount === 1;
    }
}

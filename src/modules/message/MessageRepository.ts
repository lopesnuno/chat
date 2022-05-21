import { Inject, Service } from 'typedi';

import { DatabasePool, sql } from 'slonik';

import { Repository } from '../../types';

import Message from './MessageModel';

@Service()
export default class MessageRepository implements Repository<Message> {
  constructor(
    @Inject('db')
    private db: DatabasePool
  ) {}

  async get(id: string): Promise<Message | null> {
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
    const messages = rows[0];

    return new Message(messages.id, messages.message, messages.sender_id, messages.recipient_id, messages.reply_to, messages. room_id, new Date(messages.send_at as number));
  }

    async update(o: Message): Promise<boolean> {
        const id = o.id;
        const content = o.content;

        const { rowCount } = await this.db.connect((connection) =>
            connection.query(sql`
                UPDATE messages
                SET message = ${content},
                    send_at = ${o.sendAt.toISOString()}
                WHERE id = ${id}
            `)
        );

        return rowCount === 1;
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
                VALUES (${id}, ${message.sendAt.toISOString()}, ${content}, ${senderId}, ${recipientId}, ${replyTo},
                        ${roomId});
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

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

    return new Message(messages.id, messages.message, messages.sender_id, messages.recipient_id, messages.reply_to, messages. room_id, new Date(messages.sent_at as number));
  }
  
  async list(id: string): Promise<Message[]> {
    const { rows  } = await this.db.connect((connection) =>
      connection.query(sql`
          SELECT *
          FROM messages
          WHERE room_id = ${id} LIMIT 50;
      `)
    );

    const messages = [];

    for(let i = 0; i < rows.length; i++) {
      const obj = rows[i];

      messages.push(new Message(obj.id, obj.message, obj.sender_id, obj.recipient_id, obj.reply_to, obj.room_id, new Date(obj.sent_at as number)));
    }

    return messages;
  }

  async update(o: Message): Promise<boolean> {
    const id = o.id;
    const content = o.content;

    const { rowCount } = await this.db.connect((connection) =>
      connection.query(sql`
          UPDATE messages
          SET message = ${content},
              sent_at = ${o.sentAt.toISOString()}
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
                INSERT INTO messages(id, sent_at, message, sender_id, recipient_id, reply_to, room_id)
                VALUES (${id}, ${message.sentAt.toISOString()}, ${content}, ${senderId}, ${recipientId}, ${replyTo},
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

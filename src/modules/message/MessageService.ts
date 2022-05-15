import { Inject, Service } from 'typedi';

import MessageRepository from './MessageRepository';

import Message from './MessageModel';

@Service()
export default class MessageService {
    constructor(
        @Inject()
        private repository: MessageRepository
    ) {
    }

    public async create(id: string, content: string, senderId: string, recipientId: string | null, replyTo: string | null, roomId: string | null): Promise<Message> {
        console.log(`Inserting message: "${content}" into room "${roomId}" `);
        const message = new Message(id, content, senderId, recipientId, replyTo, roomId);

        return this.repository.create(message);
    }

    public async update(id: string, content: string, senderId: string, recipientId: string, replyTo: string, roomId: string): Promise<boolean> {
        console.log(`Editing message: ${id}`);
        const message = new Message(id, content, senderId, recipientId, replyTo, roomId, new Date());

        return this.repository.update(message);
    }

    public async delete(id: string): Promise<boolean> {
        console.log(`Deleting message: ${id} `);
        return this.repository.delete(id);
    }
}

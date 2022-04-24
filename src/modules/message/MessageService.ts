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

  public async create(id: string, content: string, senderId: string, recipientId: string, replyTo: string | null, roomId: string): Promise<Message> {
    console.log(`Inserting message: "${content}" into room "${roomId}" `);
    const message = new Message(id, content, senderId, recipientId, replyTo, roomId);
    return this.repository.create(message);
  }

}

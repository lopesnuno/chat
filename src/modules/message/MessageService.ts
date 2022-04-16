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

  public async insert(id: string, content: string, senderId: string, recipientId: string, replyTo: string, roomId: string): Promise<Message> {
    console.log(`Inserting message: "${content}" into room "${roomId}" `);
    const message = new Message(id, content, senderId, recipientId, replyTo, roomId);
    return this.repository.insert(message);
  }

}

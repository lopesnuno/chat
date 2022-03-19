import { Inject, Service } from 'typedi';

import Random from '../../utils/random';

import messageRepository from './MessageRepository';
import message from './MessageModel';


@Service()
export default class MessageService {
  constructor(
    @Inject()
    private repository: messageRepository
  ) {
  }

  public async create(name: string, id?: string): Promise<message> {
    console.log(`Creating message ${id}`);
    return this.repository.create(new message(id ?? Random.id(), name, Date.now(), Date.now()));
  }

  public async get(id: string): Promise<message> {
    console.log(`Getting message ${id}`);
    return this.repository.get(id);
  }

  public async update(
    id: string,
    name: string
  ): Promise<message> {
    console.log(`Updating message ${id}`);
    // TODO
    return new message(id, name, 0, 0);
  }

  public async delete(id: string): Promise<void> {
    console.log(`delete message ${id}`);
    // TODO
  }

  // TODO: public async addMemberToMessage(memberId: string, messageId: string) {}
}

import { Inject, Service } from 'typedi';

import MessageRepository from './MessageRepository';

@Service()
export default class MessageService {
    constructor(
        @Inject()
        private repository: MessageRepository
    ) {
    }

    public async delete(id: string): Promise<boolean> {
        console.log(`Deleting message: ${id} `);
        return this.repository.delete(id);
    }

}
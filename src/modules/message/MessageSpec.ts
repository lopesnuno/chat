import Api from '../../utils/ApiClient';
import config from '../../config';

describe('Message API', () => {
    let api = null;

    beforeEach(() => {
        api = new Api();
        api.authenticate(config.testToken);
    });

    describe('Endpoints', () => {
        test('Should get a message', async() => {
            const message = await api.getMessage('aKoHkj6AXc2pXRkQ9mET');

            expect(message).toBeDefined();
        });

       test('Should get messages from room', async() => {
           const message = await api.listMessage('37KQmczHRQdgKKQqhDXF');

           expect(message).toBeDefined();
       });

       test('Should send a message', async() => {
            const { id } = await api.createMessage('Test message', null, null, '37KQmczHRQdgKKQqhDXF');

            expect(id).toBeDefined();

            const message = await api.getMessage(id);

            expect(message).toBeDefined();
       });

       test('Should update a message', async() => {
           const { id } = await api.createMessage(`Test message ${Date.now()}`, null, null, '37KQmczHRQdgKKQqhDXF');

           expect(id).toBeDefined();

           const updatedMessage = `Updated message ${Date.now()}`;
           const { updated } = await api.updateMessage(id, updatedMessage);

           expect(updated).toEqual(true);

           const message = await api.getMessage(id);

           expect(message).toBeDefined();
           expect(message.content).toEqual(updatedMessage);
       });

       test('Should delete a message', async() => {
           const { id } = await api.createMessage(`Delete test message ${Date.now()}`, null, null, '37KQmczHRQdgKKQqhDXF');

           expect(id).toBeDefined();

          const { deleted } = await api.deleteMessage(id);

          expect(deleted).toEqual(true);
       });
    });

    describe('Authentication/Authorization', () => {
        beforeEach(() => {
            api.logout();
        });

        test('Should block user from getting a message', async() => {
            await expect(api.getMessage('aKoHkj6AXc2pXRkQ9mET')).rejects.toThrow(/401/);
        });

        test('Should block user from getting messages from room', async() => {
            await expect(api.listMessage('37KQmczHRQdgKKQqhDXF')).rejects.toThrow(/401/);
        });

        test('Should block user from sending a message', async() => {
            await expect(api.createMessage('Test message', null, null, '37KQmczHRQdgKKQqhDXF')).rejects.toThrow(/401/);
        });

        test('Should block user from updating non-owned message', async() => {
            const id = 'aKoHkj6AXc2pXRkQ9mET';
            const content = `Updated message ${Date.now()}`;

            await expect(api.updateMessage(id, content)).rejects.toThrow(/401/);
        });

        test('Should block user from deleting non-owned message', async() => {
            const id = 'aKoHkj6AXc2pXRkQ9mET';

            await expect(api.deleteMessage(id)).rejects.toThrow(/401/);
        });
    });
});

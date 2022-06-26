import Api from '../../utils/ApiClient';

describe('Message API', () => {
    let api = null;

    beforeEach(() => {
        api = new Api();
    });
    //TODO: finish tests
    describe('Endpoints', () => {
       test('Should get a messages from room', async() => {
           const message = await api.getMessage('37KQmczHRQdgKKQqhDXF');

           expect(message).toBeDefined();
       });
       //TODO: finish test =>   id == undefined
       test.todo('Should send a message', async() => {
            const { id } = await api.createMessage('Test message', null, null, '37KQmczHRQdgKKQqhDXF');

            expect(id).toBeDefined();

            const message = await api.getMessage(id);

            expect(message).toBeDefined();
       });

       test('Should delete a message', async() => {
          const { id } = api.createMessage(`Delete test message ${Date.now()}`, null, null, '37KQmczHRQdgKKQqhDXF');

          expect(id).toBeDefined();

          const { deleted } = await api.deleteMessage(id);

          expect(deleted).toEqual(true);
       });
    });
});

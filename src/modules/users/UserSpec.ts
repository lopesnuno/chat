import Api from '../../utils/ApiClient';
import config from '../../config';

describe('User API', () => {
    let api = null;

    beforeEach(() => {
        api = new Api();
        api.authenticate(config.testToken);
    });
    //TODO: check why no checkpoints pass the tests
    describe('Endpoints', () => {
       test('Should get a user', async() => {
           const user = api.getUser('6jrHnwiHihRNeWqrKirW');

           expect(user).toBeDefined();
           expect(user.id).toEqual('6jrHnwiHihRNeWqrKirW');
           expect(user.name).toEqual('Rafa');
           expect(user.createdAt).toBeDefined();
           expect(user.updatedAt).toBeDefined();
       });
       
       test('Should create a user', async() => {
          const { id } = api.createUser('test user');

          expect(id).toBeDefined();

          const user = api.getUser(id);

          expect(user).toBeDefined();
       });

       test('Should update a user', async() => {
          const { id } = api.createUser(`test user ${Date.now()}`);

          expect(id).toBeDefined();

          const updatedUserName = `Updated User ${Date.now()}`;
          const { updated } = api.updateUser(id, updatedUserName);

          expect(updated).toEqual(true);

          const user = api.getUser(updated);

          expect(user).toBeDefined();
          expect(user.name).toEqual(updatedUserName);
       });

       test('Should delete a user', async() => {
          const { id } = api.createUser('Delete test user');

          expect(id).toBeDefined();

          const { deleted } = api.deleteUser(id);

          expect(deleted).toEqual(true);
       });
    });

    describe('Authorization', () => {
        test('Should block user from updating a user', async() => {
            const user = 'S3RsFtPzJaRfaT8mcDYy';
            const userName = 'Non-auth updated user';

            await expect(api.updateUser(user, userName)).rejects.toThrow(/401/);
        });
        //TODO: check why test checks but still deletes the user
        test('Should block user from deleting a user', async() => {
           const user = 'S3RsFtPzJaRfaT8mcDYy';

           await expect(api.deleteUser(user)).rejects.toThrow(/401/);
        });
    });

    describe('Authentication', () => {
        beforeEach( () => {
            api.logout();
        });

        test('Should block user from getting a user', async() => {
            await expect(api.getUser('6jrHnwiHihRNeWqrKirW')).rejects.toThrow(/401/);
        });

        test('Should block user from creating a user', async() => {
            const user = 'Non auth user';

            await expect(api.createUser(user)).rejects.toThrow(/401/);
        });

        test('Should block user from updating a user', async() => {
            const user = 'wH4ofWP4EyprKpqQWStn';
            const userName = 'Non-auth updated user';

            await expect(api.updateUser(user, userName)).rejects.toThrow(/401/);
        });

        test('Should block user from deleting a user', async() => {
            const user = 'wH4ofWP4EyprKpqQWStn';

            await expect(api.deleteUser(user)).rejects.toThrow(/401/);
        });
    });
});

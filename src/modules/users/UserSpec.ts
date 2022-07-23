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
           const user = await api.getUser('6jrHnwiHihRNeWqrKirW');

           expect(user).toBeDefined();
           expect(user.id).toEqual('6jrHnwiHihRNeWqrKirW');
           expect(user.name).toEqual('Rafa');
           expect(user.createdAt).toBeDefined();
           expect(user.updatedAt).toBeDefined();
       });
       
       test('Should create a user', async() => {
          const { id } = await api.createUser('test user');

          expect(id).toBeDefined();

          const user = await api.getUser(id);

          expect(user).toBeDefined();
       });

       test('Should update a user', async() => {
          const id = '6jrHnwiHihRNeWqrKirW';

          const updatedUserName = `Updated User ${Date.now()}`;
          const { updated } = await api.updateUser(id, updatedUserName);

          expect(updated).toEqual(true);

          const user = await api.getUser(id);

          expect(user).toBeDefined();
          expect(user.name).toEqual(updatedUserName);

          //Revert username back to original so that next time the getUser test still works
          await api.updateUser(id, 'Rafa');

          const revertUser = await api.getUser(id);

          expect(revertUser).toBeDefined();
          expect(revertUser.name).toEqual('Rafa');
       });
    });

    describe('Authorization', () => {
        test('Should block user from updating a user', async() => {
            const user = 'wH4ofWP4EyprKpqQWStn';
            const userName = 'Non-auth updated user';

            await expect(await api.updateUser(user, userName)).rejects.toThrow(/401/);
        });
        //TODO: check why test checks but still deletes the user
        test('Should block user from deleting a user', async() => {
           const user = 'wH4ofWP4EyprKpqQWStn';

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

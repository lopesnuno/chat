import Api from '../../utils/ApiClient';
import config from '../../config';

describe('Room Members API', () => {
    let api = null;

    beforeEach(() => {
        api = new Api();
        api.authenticate(config.testToken);
    });

    describe('Endpoints', () => {
        test('Should insert a user to a room', async () => {
            const roomId = 'Cuz3gcHNjdEqvXbqv';
            const userId = 'S3RsFtPzJaRfaT8mcDYy';
            const { id } = await api.insertUser(roomId, userId);

            expect(id).toBeDefined();
        });

        test('Should delete user from room', async () => {
            const roomId = 'Cuz3gcHNjdEqvXbqv';
            const userId = 'S3RsFtPzJaRfaT8mcDYy';
            const { deleted } = await api.removeUser(roomId, userId);

            expect(deleted).toEqual(true);
        });
    });

    describe('Authorization', () => {
        test('Shoudl block user from inserting user in a non-owned room', async() => {
            const roomId = '37KQmczHRQdgKKQqhDXF';
            const userId = 'S3RsFtPzJaRfaT8mcDYy';

            await expect(api.insertUser(roomId, userId)).rejects.toThrow(/401/);
        });

        test('Should block user from removing user from non-owned room', async() => {
           const roomId = '37KQmczHRQdgKKQqhDXF';
           const userId = 'wH4ofWP4EyprKpqQWStn';

           await expect(api.removeUser(roomId, userId)).rejects.toThrow(/401/);
        });
    });

    describe('Authentication', () => {
        beforeEach(() => {
           api.logout();
        });

        test('Should block user from inserting user in room', async() => {
            const roomId = 'Cuz3gcHNjdEqvXbqv';
            const userId = 'S3RsFtPzJaRfaT8mcDYy';

            await expect(api.insertUser(roomId, userId)).rejects.toThrow(/401/);
        });

        test('Should block user from inserting deleting user from room', async() => {
            const roomId = 'Cuz3gcHNjdEqvXbqv';
            const userId = 'S3RsFtPzJaRfaT8mcDYy';

            await expect(api.removeUser(roomId, userId)).rejects.toThrow(/401/);
        });
    });
});

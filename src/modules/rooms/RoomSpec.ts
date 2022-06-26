import Api from '../../utils/ApiClient';

import config from '../../config';

describe('Rooms API', () => {
  let api = null;

  beforeEach(() => {
    api = new Api();
    api.authenticate(config.testToken);
  });

  describe('Endpoints', () => {
    test('should get a room', async () => {
      const room = await api.getRoom('37KQmczHRQdgKKQqhDXF');

      expect(room).toBeDefined();
      expect(room.id).toEqual('37KQmczHRQdgKKQqhDXF');
      expect(room.name).toEqual('Biclas e borgas');
      expect(room.createdAt).toBeDefined();
      expect(room.updatedAt).toBeDefined();
    });

    test('should create a room', async () => {
      const { id } = await api.createRoom('test room');

      expect(id).toBeDefined();

      const room = await api.getRoom(id);

      expect(room).toBeDefined();
    });

    test('should update room', async () => {
      const roomName = `Test room ${Date.now()}`;
      const { id } = await api.createRoom(roomName);

      expect(id).toBeDefined();

      const updatedRoomName = `Updated Test room ${Date.now()}`;
      const { updated } = await api.updateRoom(id, updatedRoomName);

      expect(updated).toEqual(true);

      const room = await api.getRoom(id);

      expect(room).toBeDefined();
      expect(room.name).toEqual(updatedRoomName);
    });

    test('should delete room', async() => {
      const roomName = `Delete test room ${Date.now()}`;
      const { id } = await api.createRoom(roomName);

      expect(id).toBeDefined();

      const { deleted } = await api.deleteRoom(id);

      expect(deleted).toEqual(true);
    });
  });


  describe('Authentication/Authorization', () => {
    test('should block user from getting non-owned room', async () => {
      api.logout();

      await expect(api.getRoom('37KQmczHRQdgKKQqhDXF')).rejects.toThrow(/401/);
    });

    test('should block non-authenticated user from creating room', async() => {
      api.logout();

      const room = `Test room ${Date.now()}`;

      await expect(api.createRoom(room)).rejects.toThrow(/401/);
    });

    test('should block user from updating non-owned room', async() => {
      const room = '37KQmczHRQdgKKQqhDXF';
      const roomName = `Update try ${Date.now()}`;

      await expect(api.updateRoom(room, roomName)).rejects.toThrow(/401/);
    });

    test('should block user from deleting non-owned room', async() => {
      const room = '37KQmczHRQdgKKQqhDXF';

      await expect(api.deleteRoom(room)).rejects.toThrow(/401/);
    });
  });

});

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

    /*test('should delete room', async() => {
      const roomName = `Deleted Test room ${Date.now()}`;
      const { id } = await api.deleteRoom(roomName);

      expect(id).toBeUndefined();

      const deletedRoomName = `Deleted Test room ${Date.now()}`;
      const { deleted } = await api.deleteRoom(id, deletedRoomName);

      expect(deleted).toBeUndefined();

      const room = await api.getRoom(id);

      expect(room).toBeUndefined();
    });*/
  });


  describe('Authentication/Authorization', () => {
    test('should block user from creating room', async () => {
      api.logout();

      // TODO: once we have auth in this branch, test if auth is working properly for all endpoints
      await expect(api.getRoom('37KQmczHRQdgKKQqhDXF')).rejects.toThrow(/401/);
    });
  });

});

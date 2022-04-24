import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';
import usersApi from '../modules/users/UserApi';
import roomMembersApi from "../modules/roomMembers/RoomMembersApi";


export default (): Router => {
  const app = Router();

  roomsApi(app);
  usersApi(app);
  roomMembersApi(app);
  return app;
};

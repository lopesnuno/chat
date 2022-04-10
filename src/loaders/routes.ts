import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';
import usersApi from '../modules/users/UserApi';
import room_membersApi from "../modules/room_members/Room_membersApi";


export default (): Router => {
  const app = Router();

  usersApi(app);
  roomsApi(app);
  room_membersApi(app);
  return app;
};

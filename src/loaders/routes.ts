import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';
import usersApi from '../modules/users/UserApi';
import roomMembersApi from "../modules/roomMembers/RoomMembersApi";
import messageApi from "../modules/message/MessageApi";


export default (): Router => {
  const app = Router();

  messageApi(app);
  usersApi(app);
  roomsApi(app);
  roomMembersApi(app);
  return app;
};

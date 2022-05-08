import { Router } from 'express';

import messageApi from "../modules/message/MessageApi";
import usersApi from '../modules/users/UserApi';
import roomsApi from '../modules/rooms/RoomApi';
import roomMembersApi from "../modules/roomMembers/RoomMembersApi";


export default (): Router => {
  const app = Router();

  messageApi(app);
  usersApi(app);
  roomsApi(app);
  roomMembersApi(app);
  return app;
};

import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';
//import messageApi from '../modules/message/MessageApi';
import accountApi from '../modules/account/AccountApi';
//import roomMembersApi from '../modules/room_members/RoomMembersApi';

export default (): Router => {
  const app = Router();

  //roomMembersApi();
  //messageApi();
  accountApi(app);
  roomsApi(app);
  return app;
};

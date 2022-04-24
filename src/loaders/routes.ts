import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';
import usersApi from '../modules/users/UserApi';
import messagesApi from "../modules/message/MessageApi";


export default (): Router => {
  const app = Router();

  messagesApi(app);
  usersApi(app);
  roomsApi(app);
  return app;
};

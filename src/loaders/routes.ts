import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';
import usersApi from '../modules/users/UserApi';


export default (): Router => {
  const app = Router();

  usersApi(app);
  roomsApi(app);
  return app;
};

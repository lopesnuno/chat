import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';
import accountApi from '../modules/account/AccountApi';


export default (): Router => {
  const app = Router();

  accountApi(app);
  roomsApi(app);
  return app;
};

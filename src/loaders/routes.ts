import { Router } from 'express';

import roomsApi from '../modules/rooms/RoomApi';


export default (): Router => {
  const app = Router();

  roomsApi(app);
  return app;
};

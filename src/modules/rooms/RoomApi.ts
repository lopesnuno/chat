import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import RoomService from './RoomService';


async function updateRoom(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling update room: %o', req.body);
  try {
    const service = Container.get<RoomService>(RoomService);
    const { id, name } = req.body;

    const room = await service.update(id, name);

    return res.status(200).json(room.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.put('/room/:id', updateRoom);
};

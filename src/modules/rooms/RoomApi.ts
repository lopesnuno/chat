import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import RoomService from './RoomService';

async function getRoom(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling get room: %o', req.params.id);
  try {
    const service = Container.get<RoomService>(RoomService);
    const id = req.params.id;
    const room = await service.get(id);

    return res.status(200).json(room.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function createRoom(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling create room: %o', req.body);
  try {
    const service = Container.get<RoomService>(RoomService);
    const { name } = req.body;
    const room = await service.create(name);

    return res.status(200).json(room.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function updateRoom(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling update room: %o', req.body);
  try {
    const service = Container.get<RoomService>(RoomService);
    const { id, name } = req.body;

    // TODO: change to service.update, once implemented
    const room = await service.update(id, name);

    return res.status(200).json(room.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.get('/room/:id', getRoom);
  app.post('/room', createRoom);
  app.put('/room/:id', updateRoom);
};

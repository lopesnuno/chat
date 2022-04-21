import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import RoomService from './RoomService';

import Random from "../../utils/random";

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
    const id = Random.id();
    const owner = '6jrHnwiHihRNeWqrKirW'  //TODO: replace when we have authentication

    await service.create(id, name, owner);

    return res.status(200).json({ id });
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

    const updated = await service.update(id, name);

    return res.status(200).json({ updated });
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function deleteRoom(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling delete room: %o', req.body);
  try {
    const service = Container.get<RoomService>(RoomService);
    const { id } = req.body;

    const deleted = await service.delete(id);

    return res.status(200).json({ deleted });
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.post('/room/', createRoom);
  app.get('/room/:id', getRoom);
  app.put('/room/', updateRoom);
  app.delete('/room/', deleteRoom);

};

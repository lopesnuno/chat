import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import RoomMembersService from './RoomMembersService';

async function getRoomMembers(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling get room: %o', req.params.id);
  try {
    const service = Container.get<RoomMembersService>(RoomMembersService);
    const id = req.params.id;
    const roomMembers = await service.get(id);

    return res.status(200).json(roomMembers.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function createRoomMembers(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling create room: %o', req.body);
  try {
    const service = Container.get<RoomMembersService>(RoomMembersService);
    const { name } = req.body;
    const room = await service.create(name);

    return res.status(200).json(room.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function updateRoomMembers(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling update room: %o', req.body);
  try {
    const service = Container.get<RoomMembersService>(RoomMembersService);
    const { name } = req.body;
    // TODO: change to service.update, once implemented
    const room = await service.create(name);

    return res.status(200).json(room.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.get('/room_members/:id', getRoomMembers());
  app.post('/room_members', createRoomMembers());
  app.put('/room_members', updateRoomMembers());
};

import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import RoomMembersService from './RoomMembersService';

import Random from "../../utils/random";

async function create(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling insert user: %o', req.body);
  try{
    const service = Container.get<RoomMembersService>(RoomMembersService);
    const { roomId, userId } = req.body;
    const id = Random.id();

    await service.create(id, roomId, userId);

    return res.status(200). json({ id })
  } catch(e){
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.post('/roomMembers/', create);
};

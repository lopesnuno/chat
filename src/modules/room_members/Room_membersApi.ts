import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import Room_membersService from './Room_membersService';

import Random from "../../utils/random";

async function insert(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling insert user: %o', req.body);
  try{
    const service = Container.get<Room_membersService>(Room_membersService);
    const { roomId, userId} = req.body;
    const id = Random.id();

    const insert = await service.insert(id, roomId, userId);

    return res.status(200). json({ insert })
  } catch(e){
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.post('/room_members/', insert);
};

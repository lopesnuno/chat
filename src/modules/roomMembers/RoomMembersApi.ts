import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { Container } from 'typedi';

import Random from '../../utils/random';

import RoomMembersService from './RoomMembersService';


const create: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  console.debug('Calling insert user: %o', req.body);
  try{
    const service = Container.get<RoomMembersService>(RoomMembersService);
    const { roomId, userId } = req.body;
    const id = Random.id();

    await service.create(id, roomId, userId);

    return res.status(200). json({ id });
  } catch(e){
    console.error('🔥 error: %o', e);
    next(e);
  }
};

const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.debug('Calling delete room member: %o', req.body);
    try{
        const service = Container.get<RoomMembersService>(RoomMembersService);
        const { id } = req.body;

        const deleted = await service.delete(id);

        return res.status(200). json({ deleted });
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
};

export default (app: Router): void => {
    app.post('/roomMembers/', create);
    app.delete('/roomMembers/', deleteUser);
};

import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import RoomMembersService from './RoomMembersService';
import RoomService from "../rooms/RoomService";
import * as Auth from "../../middlewares/auth.middleware";

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

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.debug('Calling delete room member: %o', req.body);
    try{
        const service = Container.get<RoomMembersService>(RoomMembersService);
        const { userId, roomId } = req.body;

        const roomService = Container.get<RoomService>(RoomService);
        const room = await roomService.get(roomId);

        if(room.owner !== req.user.id){
            return res.status(401).json({message: 'Not enough privileges'})
        }

        const deleted = await service.delete(userId);

        return res.status(200). json({ deleted })
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
}

export default (app: Router): void => {
    app.delete('/room-members/', Auth.authorize([]),deleteUser);
    app.post('/room-members/', Auth.authorize([]), create);
};
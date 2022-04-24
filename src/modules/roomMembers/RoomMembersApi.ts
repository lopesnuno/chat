import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import RoomMembersService from './RoomMembersService';


async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.debug('Calling delete room member: %o', req.body);
    try{
        const service = Container.get<RoomMembersService>(RoomMembersService);
        const { id } = req.body;

        const deleted = await service.delete(id);

        return res.status(200). json({ deleted })
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
}

export default (app: Router): void => {
    app.delete('/roomMembers/', deleteUser);
};
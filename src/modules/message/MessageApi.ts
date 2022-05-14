import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import * as Auth from '../../middlewares/auth.middleware';

import MessageService from './MessageService';

import Random from "../../utils/random";

async function create(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling insert message: %o', req.body);
  try{
    const service = Container.get<MessageService>(MessageService);
    const { content, recipientId, replyTo, roomId } = req.body;
    const id = Random.id();

    await service.create(id, content, req.user.id, recipientId, replyTo, roomId);

    return res.status(200). json({ id })
  } catch(e){
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function deleteMessage(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.debug('Calling delete message: %o', req.body);
    try{
        const service = Container.get<MessageService>(MessageService);
        const { id } = req.body;
        const message = await service.get(id);

        if(message.senderId !== req.user.id){
            return res.status(401).json({message: 'Not enough privileges'})
        }

        const deleted = await service.delete(id);

        return res.status(200). json({ deleted })
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
}

export default (app: Router): void => {
  app.post('/message/', Auth.authorize([]), create);
  app.delete('/message/', Auth.authorize([]), deleteMessage);
};

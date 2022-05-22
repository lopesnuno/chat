import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { Container } from 'typedi';

import * as Auth from '../../middlewares/auth.middleware';

import Random from '../../utils/random';

import MessageService from './MessageService';

const list: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.debug('Calling list messages: %o', req.params.room);
    try {
        const service = Container.get<MessageService>(MessageService);
        const room = req.params.room;
        const messages = await service.list(room);

        return res.status(200).json(messages);
    } catch (e) {
        console.error('🔥 error: %o', e);
        return next(e);
    }
};

const create: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.debug('Calling insert message: %o', req.body);
    try{
        const service = Container.get<MessageService>(MessageService);
        const { content, recipientId, replyTo, roomId } = req.body;
        const id = Random.id();

        await service.create(id, content, req.user.id, recipientId, replyTo, roomId);

        return res.status(200).json({ id });
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
};

const update: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.debug('Calling update message: %o', req.body);
    try {
        const service = Container.get<MessageService>(MessageService);
        const { id, content } = req.body;
        const message = await service.get(id);

        const senderId = message.senderId;
        const recipientId = message.recipientId;
        const replyTo = message.replyTo;
        const roomId = message.roomId;

        if(message.senderId !== req.user.id){
            return res.status(401).json({ message: 'Not enough privileges' });
        }

        const updated = await service.update(id, content, senderId, recipientId, replyTo, roomId);

        return res.status(200).json({ updated });
    } catch (e) {
        console.error('🔥 error: %o', e);
        return next(e);
    }
};

const deleteMessage: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.debug('Calling delete message: %o', req.body);
    try{
        const service = Container.get<MessageService>(MessageService);
        const { id } = req.body;
        const message = await service.get(id);

        if(message.senderId !== req.user.id){
            return res.status(401).json({ message: 'Not enough privileges' });
        }

        const deleted = await service.delete(id);

        return res.status(200).json({ deleted });
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
};

export default (app: Router): void => {
    app.get('/messages/:room', Auth.authorize([]), list);
    app.post('/message/', Auth.authorize([]), create);
    app.put('/message/', Auth.authorize([]),  update);
    app.delete('/message/', Auth.authorize([]), deleteMessage);
};

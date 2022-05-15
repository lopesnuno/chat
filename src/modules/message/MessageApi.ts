import { NextFunction, Request, RequestHandler, Response, Router } from 'express';
import { Container } from 'typedi';

import Random from '../../utils/random';

import MessageService from './MessageService';

const create: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.debug('Calling insert message: %o', req.body);
    try{
        const service = Container.get<MessageService>(MessageService);
        const { content, senderId, recipientId, replyTo, roomId } = req.body;
        const id = Random.id();

        await service.create(id, content, senderId, recipientId, replyTo, roomId);

        return res.status(200). json({ id });
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
};

const update: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    console.debug('Calling update message: %o', req.body);
    try {
        const service = Container.get<MessageService>(MessageService);
        const { id, content, senderId, recipientId, replyTo, roomId } = req.body;

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

        const deleted = await service.delete(id);

        return res.status(200). json({ deleted });
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
};

export default (app: Router): void => {
    app.post('/message/', create);
    app.put('/message/', update);
    app.delete('/message/', deleteMessage);
};

//TODO: merge authentication

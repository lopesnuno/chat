import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import MessageService from './MessageService';


async function deleteMessage(req: Request, res: Response, next: NextFunction): Promise<Response> {
    console.debug('Calling delete message: %o', req.body);
    try{
        const service = Container.get<MessageService>(MessageService);
        const { id } = req.body;

        const deleted = await service.delete(id);

        return res.status(200). json({ deleted })
    } catch(e){
        console.error('🔥 error: %o', e);
        return next(e);
    }
}

export default (app: Router): void => {
    app.delete('/message/', deleteMessage);
};
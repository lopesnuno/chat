import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import messageService from './MessageService';

async function getMessage(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling get message: %o', req.params.id);
  try {
    const service = Container.get<messageService>(messageService);
    const id = req.params.id;
    const message = await service.get(id);

    return res.status(200).json(message.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function createMessage(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling create message: %o', req.body);
  try {
    const service = Container.get<messageService>(messageService);
    const { name } = req.body;
    const message = await service.create(name);

    return res.status(200).json(message.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function updateMessage(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling update message: %o', req.body);
  try {
    const service = Container.get<messageService>(messageService);
    const { name } = req.body;
    // TODO: change to service.update, once implemented
    const message = await service.create(name);

    return res.status(200).json(message.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.get('/message/:id', getMessage);
  app.post('/message', createMessage);
  app.put('/message', updateMessage);
};

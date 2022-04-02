import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import UserService from './UserService';

async function getUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling get user: %o', req.params.id);
  try {
    const service = Container.get<UserService>(UserService);
    const id = req.params.id;
    const user = await service.get(id);

    return res.status(200).json(user.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.get('/user/:id', getUser);
};
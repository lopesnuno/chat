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

async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling create user: %o', req.body);
  try {
    const service = Container.get<UserService>(UserService);
    const { name } = req.body;
    const user = await service.create(name);

    return res.status(200).json(user.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling update user: %o', req.body);
  try {
    const service = Container.get<UserService>(UserService);
    const { name } = req.body;
    // TODO: change to service.update, once implemented
    const user = await service.create(name);

    return res.status(200).json(user.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.get('/user/:id', getUser);
  app.post('/user', createUser);
  app.put('/user', updateUser);
};

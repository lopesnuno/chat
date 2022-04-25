import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import UserService from './UserService';
import Random from "../../utils/random";

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
    const id = Random.id();

    await service.create(id, name);

    return res.status(200).json({ id });
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling update user: %o', req.body);
  try {
    const service = Container.get<UserService>(UserService);
    const { id, name } = req.body;

    const updated = await service.update(id, name);

    return res.status(200).json({ updated });
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling delete user: %o', req.body);
  try {
    const service = Container.get<UserService>(UserService);
    const { id } = req.body;

    const deleted = await service.delete(id);

    return res.status(200).json({ deleted });
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.post('/user', createUser);
  app.get('/user/:id', getUser);
  app.put('/user/', updateUser);
  app.delete('/user/', deleteUser);
};

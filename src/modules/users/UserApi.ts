import { NextFunction, Request, Response, RequestHandler, Router } from 'express';
import { Container } from 'typedi';

import * as Auth from '../../middlewares/auth.middleware';

import Random from '../../utils/random';

import UserService from './UserService';

const getUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  console.debug('Calling get user: %o', req.params.id);
  try {
    const service = Container.get<UserService>(UserService);
    const id = req.params.id;
    const user = await service.get(id);

    console.log(req.query.room);

    return res.status(200).json(user.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
};

const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
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
};

const updateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  console.debug('Calling update user: %o', req.body);
  try {
    const service = Container.get<UserService>(UserService);
    const { id, name } = req.body;
    const user = await service.get(id);

    const updated = await service.update(id, name);

    if(user.id !== req.user.id){
      return res.status(401).json({ message: 'Not enough privileges' });
    }

    return res.status(200).json({ updated });
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
};

const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  console.debug('Calling delete user: %o', req.body);
  try {
    const service = Container.get<UserService>(UserService);
    const { id } = req.body;
    const user = await service.get(id);

    const deleted = await service.delete(id);

    if(user.id !== req.user.id){
      return res.status(401).json({ message: 'Not enough privileges' });
    }

    return res.status(200).json({ deleted });
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
};

export default (app: Router): void => {
  app.post('/user', Auth.authorize([]), createUser);
  app.get('/user/:id', Auth.authorize([]), getUser);
  app.put('/user/', Auth.authorize([]), updateUser);
  app.delete('/user/', Auth.authorize([]), deleteUser);
};

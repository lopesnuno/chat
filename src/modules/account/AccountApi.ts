import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';

import accountService from './AccountService';

async function getAccount(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling get account: %o', req.params.id);
  try {
    const service = Container.get<accountService>(accountService);
    const id = req.params.id;
    const account = await service.get(id);

    return res.status(200).json(account.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function createAccount(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling create account: %o', req.body);
  try {
    const service = Container.get<accountService>(accountService);
    const { name } = req.body;
    const account = await service.create(name);

    return res.status(200).json(account.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

async function updateAccount(req: Request, res: Response, next: NextFunction): Promise<Response> {
  console.debug('Calling update account: %o', req.body);
  try {
    const service = Container.get<accountService>(accountService);
    const { name } = req.body;
    // TODO: change to service.update, once implemented
    const account = await service.create(name);

    return res.status(200).json(account.json());
  } catch (e) {
    console.error('🔥 error: %o', e);
    return next(e);
  }
}

export default (app: Router): void => {
  app.get('/account/:id', getAccount);
  app.post('/account', createAccount);
  app.put('/account', updateAccount);
};

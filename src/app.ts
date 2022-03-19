import 'reflect-metadata';
import express from 'express';

import { Container } from 'typedi';
import { createPool } from 'slonik';

import config from './config';
import setupExpress from './loaders/express';


async function startServer() {
  const app = express();
  const pool = createPool(config.databaseURL);

  setupExpress({ app });
  Container.set('db', pool);

  app
    .listen(config.port, () => {
      console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      console.error(err);
      process.exit(1);
    });
}

startServer().catch();

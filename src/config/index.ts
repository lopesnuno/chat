import path from 'path';

import { config as dotenvConfig } from 'dotenv';

import { Algorithm } from 'jsonwebtoken';

function loadConfigFile(env) {
  let filename: string;

  switch (env) {
    case 'development':
      filename = '.env.dev';
      break;
    case 'test':
      filename = '.env.test';
      break;
    default:
      filename = '.env';
  }
  return path.resolve(__dirname, `../../${filename}`);
}

const configFile = dotenvConfig({
  path: loadConfigFile(process.env.NODE_ENV || 'dev')
});

if (configFile.error) {
  // This error should crash whole process

  throw new Error('⚠️  Couldn\'t find .env file  ⚠️');
}

const config = configFile.parsed;


export default {

  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT ?? '5000', 10),

  /**
   * That long string from mlab
   */
  databaseURL: config.DATABASE_URL,

  /** d
   * Your secret sauce
   */
  jwtSecret: config.JWT_SECRET ?? 'qweertyuiop',
  jwtAlgorithm: (config.JWT_ALGO ?? 'HS256') as Algorithm,
  testToken: config.TOKEN,

  /**
   * Used by winston logger
   */
  logs: {
    level: config.LOG_LEVEL || 'debug'
  },

  /**
   * API configs
   */
  api: {
    prefix: '/'
  },

  isDev(): boolean {
    return process.env.NODE_ENV === 'development';
  }

};

import express, { ErrorRequestHandler, Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config';

import routes from './routes';

const disableAllCache = (app: Express): void => {
  app.set('etag', false);
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
};

export default ({ app }: { app: express.Application }): void => {
  // app.use(bodyParser.json({ limit: '50mb' }));

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.get('/', (req, res) => res.send('⚡️[server]: Server is running'));

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // params to cors are designed to allow a cookie from api deployed to municipality
  // to be sent for authentication
  const corsConfig = {
    // access-control-allow-credentials: true
    credentials: true,
    // return referrer as the access-control-allow-origin
    origin(req, callback) {
      callback(null, true);
    }
  };

  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  disableAllCache(app);

  /// error handlers
  const error401Handler: ErrorRequestHandler = (err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  };

  app.use(error401Handler);
};

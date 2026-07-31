import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/error.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later' },
  })
);

app.get('/', (req, res) => {
  res.json({
    name: 'Tibamkononi API',
    status: 'ok',
    version: 'v1',
    health: '/v1/health',
    endpoints: ['/v1/auth', '/v1/hospitals', '/v1/inventory', '/v1/county', '/v1/emergency'],
  });
});

app.use('/v1', routes);

app.get(['/v1', '/v1/'], (req, res) => res.redirect('/v1/health'));

app.use(notFound);
app.use(errorHandler);

export default app;

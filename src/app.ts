import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';

import { errorHandler } from './middlewares/error-handler';
import { starterRouter } from './routes/starter';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(cors());
app.use(json());

app.use('/v1', starterRouter);

app.all('*', ({ url }) => {
  throw new NotFoundError(`Route '${url}' not found.`);
});

app.use(errorHandler);

export default app;

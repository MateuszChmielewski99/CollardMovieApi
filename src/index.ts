import 'reflect-metadata';
import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { bootstrap } from './container-setup';
import MovieRouter from './routers/MovieRoutes';
import cors from 'cors';

dotenv.config();

bootstrap();

const app: Application = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api/movie', MovieRouter);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`App and running on port ${port}`);
});

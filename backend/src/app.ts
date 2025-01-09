import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './logger';
import AppDataSource from './data-source';
import urlRouter from './routes/user';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1/', urlRouter);

app.get('/', (_, res) => {
  res.json('Initial Commit');
});

const start = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(port, () => logger.info(`Server is listening on port ${port}`));
  } catch (error) {
    logger.error(`could not connect to this server ${error}`);
  }
};

start();

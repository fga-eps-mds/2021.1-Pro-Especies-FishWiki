import express from 'express';
import dotenv from 'dotenv';
import databaseConnect from './config/database';
import router from './routes/router';

dotenv.config();

const app = express();

databaseConnect();

app.use(express.json());

app.use(router);

export default app;

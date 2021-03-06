import 'reflect-metadata';
import express from 'express';
import './database/connect';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = 3333;

app.use(cors({exposedHeaders: 'Token'}));
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(
  `🦄🍄 Server started on port ${port}. Waiting database...`
));


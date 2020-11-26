import 'reflect-metadata';
import express, { json } from 'express';

import './config/env';
import './database';

import routes from './routes';

const app = express();

app.use(json());
app.use(routes);

app.listen(3333, () => {
	console.log('Server started on port 3333!');
});

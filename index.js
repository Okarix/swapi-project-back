import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import mongoose from 'mongoose';
import { getPeoples } from './controllers/PeopleController.js';

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('DB OK'))
	.catch(err => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('SWAPI PROJECT');
});

app.get('/peoples', getPeoples);

app.listen(4444, err => {
	if (err) {
		return console.log(err);
	}

	console.log('Server OK');
});

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { getPeopleByName, getPeoples } from './controllers/PeopleController.js';
import { getPlanetByName, getPlanets } from './controllers/PlanetController.js';
import { getStarshipByName, getStarships } from './controllers/StarshipController.js';

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:adiar2003@cluster0.xn2zx35.mongodb.net/starwars?retryWrites=true&w=majority&appName=Cluster0')
	.then(() => console.log('DB OK'))
	.catch(err => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('SWAPI PROJECT');
});

app.get('/peoples', getPeoples);
app.get('/peoples/search', getPeopleByName);
app.get('/planets', getPlanets);
app.get('/planets/search', getPlanetByName);
app.get('/starships', getStarships);
app.get('/starships/search', getStarshipByName);

app.listen(4444, err => {
	if (err) {
		return console.log(err);
	}

	console.log('Server OK');
});

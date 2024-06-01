import Planet from '../models/Planet.js';
import axios from 'axios';

export const getPlanets = async (req, res) => {
	try {
		const pageNumber = req.query.pageNumber || 1;

		const response = await axios.get(`https://swapi.dev/api/planets/?page=${pageNumber}`);
		const data = response.data.results;

		for (let planetData of data) {
			const existingPlanet = await Planet.findOne({ name: planetData.name });
			if (!existingPlanet) {
				const planet = new Planet(planetData);
				await planet.save();
				console.log(`Saved: ${planet.name}`);
			} else {
				console.log(`Already exists: ${planetData.name}`);
			}
		}

		const planets = await Planet.find();
		res.json(planets);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error calling external API or saving data');
	}
};

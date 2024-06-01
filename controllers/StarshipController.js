import Starship from '../models/Starship.js';
import axios from 'axios';

export const getStarships = async (req, res) => {
	try {
		const pageNumber = req.query.pageNumber || 1;

		const response = await axios.get(`https://swapi.dev/api/starships/?page=${pageNumber}`);
		const data = response.data.results;

		for (let starshipData of data) {
			const existingStarship = await Starship.findOne({ name: starshipData.name });
			if (!existingStarship) {
				const starship = new Starship(starshipData);
				await starship.save();
				console.log(`Saved: ${starship.name}`);
			} else {
				console.log(`Already exists: ${starshipData.name}`);
			}
		}

		const starships = await Starship.find();
		res.json(starships);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error calling external API or saving data');
	}
};

export const getStarshipByName = async (req, res) => {
	try {
		const name = req.query.name;
		if (!name) {
			return res.status(400).send('Name query parameter is required');
		}

		const starship = await Starship.find({ name: { $regex: name, $options: 'i' } });
		if (starship.length === 0) {
			return res.status(404).send('No starship found with the given name');
		}

		res.json(starship);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error searching for starship by name');
	}
};

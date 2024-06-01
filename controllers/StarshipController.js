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

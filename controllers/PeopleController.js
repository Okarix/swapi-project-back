import People from '../models/People.js';
import axios from 'axios';

export const getPeoples = async (req, res) => {
	try {
		const pageNumber = req.query.pageNumber || 1;

		const response = await axios.get(`https://swapi.dev/api/people/?page=${pageNumber}`);
		const data = response.data.results;

		for (let peopleData of data) {
			const existingPeople = await People.findOne({ name: peopleData.name });
			if (!existingPeople) {
				const people = new People(peopleData);
				await people.save();
				console.log(`Saved: ${people.name}`);
			} else {
				console.log(`Already exists: ${peopleData.name}`);
			}
		}

		const peoples = await People.find();
		res.json(peoples);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error calling external API or saving data');
	}
};

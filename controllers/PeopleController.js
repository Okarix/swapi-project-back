import People from '../models/People.js';
import axios from 'axios';

export const getPeoples = async (req, res) => {
	try {
		const pageNumber = parseInt(req.query.pageNumber) || 1;
		const pageSize = parseInt(req.query.pageSize) || 10;

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

		const skip = (pageNumber - 1) * pageSize;
		const peoples = await People.find().skip(skip).limit(pageSize);
		res.json(peoples);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error calling external API or saving data');
	}
};

export const getPeopleByName = async (req, res) => {
	try {
		const name = req.query.name;
		if (!name) {
			return res.status(400).send('Name query parameter is required');
		}

		const people = await People.find({ name: { $regex: name, $options: 'i' } });
		if (people.length === 0) {
			return res.status(404).send('No people found with the given name');
		}

		res.json(people);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error searching for people by name');
	}
};

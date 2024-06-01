import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/people', async (req, res) => {
	try {
		const response = await axios.get('https://swapi.dev/api/people/?page=1');
		res.json(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error calling external API');
	}
});

app.listen(4444, err => {
	if (err) {
		return console.log(err);
	}

	console.log('Server OK');
});

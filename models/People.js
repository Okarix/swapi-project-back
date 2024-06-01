import mongoose from 'mongoose';

const peopleSchema = new mongoose.Schema({
	name: String,
	height: String,
	mass: String,
	hair_color: String,
	skin_color: String,
	eye_color: String,
	birth_year: String,
	gender: String,
	homeworld: String,
});

export default mongoose.model('People', peopleSchema);

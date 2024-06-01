import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema({
	name: String,
	rotation_period: String,
	orbital_period: String,
	diameter: String,
	climate: String,
	gravity: String,
	terrain: String,
	surface_water: String,
	population: String,
});

export default mongoose.model('Planet', planetSchema);

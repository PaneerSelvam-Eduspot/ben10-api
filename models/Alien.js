import mongoose from 'mongoose';

const alienSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  planet: { type: String, required: true },
  abilities: { type: String, required: true },
  image: { type: String },
  series: { type: String, required: true }
}, {
  collection: 'aliens',
});

const Alien = mongoose.model('Alien', alienSchema);

export default Alien;

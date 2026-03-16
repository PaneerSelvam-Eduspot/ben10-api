import mongoose from 'mongoose';

const alienSchema = new mongoose.Schema({
  id: {type: String, required: true},
  name: { type: String, required: true },
  species: { type: String, required: true },
  planet: { type: String, required: true },
  abilities: { type: String, required: true },
  image: { type: String, required: true },
  transform: {type: String, required: true},
  series: { type: String, required: true },
  firstAppearance: { type: String, required: true},
  description: {type: String, required: true}
}, {
  collection: 'ben10aliens',
});

const Alien = mongoose.model('Alien', alienSchema);

export default Alien;

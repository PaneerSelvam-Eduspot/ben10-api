import mongoose from 'mongoose';

const alienSchema = new mongoose.Schema({
  id: {type: Number, required: true, index: true},
  name: { type: String, required: true, index: true},
  series: { type: String, required: true, index: true},
}, {
  collection: 'ben10aliens',
});

const Alien = mongoose.model('ben10aliens', alienSchema);

export default Alien;

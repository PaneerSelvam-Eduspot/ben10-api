import Alien from '../models/Alien.js';


let aliens = [];

export const getAliens = async(req, res) => {
  try{
    const aliens = await Alien.find();
    res.status(200).json(aliens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createAliens = async (req, res) => {

  const alien = new Alien(req.body);
  
  try{
    const savedAlien = await alien.save();
    res.status(201).json(savedAlien);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAlien = async (req,res) => {

  try{
    const alien = await Alien.findById(req.params.id);
    if(!alien) return res.status(404).json({ message: 'Alien not found'});
    res.status(200).json(alien);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteAlien = async (req, res) => {
   
  const { id } = req.params;

  try{
    const deleteAlien = await Alien.findByIdAndDelete(id);

    if (!deleteAlien) return res.status(404).json({message:'Alien not found'});
    
    res.status(200).json({message:'Alien deleted successfully'}); 
  } catch(error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateAlien = async (req, res) => {
    try{
      const updateAlien = await Alien.findByIdAndUpdate(req.params.id, req.body, { new:true });
      if(!updateAlien) return res.status(404).json({message: 'Alien not found'});
      res.status(200).json(updateAlien);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};
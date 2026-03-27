import Alien from '../models/Alien.js';

const seriesMap = {
    "classic": "Ben 10 Classic",
    "alien-force": "Ben 10 Alien Force",
    "ultimate-alien": "Ben 10 Ultimate Alien"
}

export const getAliens = async(req, res) => {
    try { 
      const seriesParam = req.params.series;      
      const seriesName = seriesMap[seriesParam];

      if (!seriesName){
        return res.status(404).json({ message: "Series not found" });
      }

      const { name, id } = req.query; 
      let mongoQuery = { series: seriesName};

      if (name) mongoQuery.name = new RegExp(name, 'i');
      if (id) mongoQuery.id = id;

      const aliens = await Alien.find(mongoQuery);

      const aliensWithUrls = aliens.map(alien => ({
        ...alien._doc,
        image: `/public/aliens/image/${alien.image}`,
        transform: `/public/aliens/transformimg/${alien.transform}`
      }));

      res.status(200).json(aliensWithUrls);
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
    try {
      const seriesParam = req.params.series;
      const seriesName = seriesMap[seriesParam];

      if (!seriesName) {
        return res.status(404).json({ message: "Series not found" });
      }

      const alien = await Alien.findOne({ 
        id: req.params.id, 
        series: seriesName 
      });

      if (!alien) return res.status(404).json({ message: 'Alien not found'});
      
      res.status(200).json({
        ...alien._doc,
        image: `/public/aliens/image/${alien.image}`,
        transform: `/public/aliens/transformimg/${alien.transform}`
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
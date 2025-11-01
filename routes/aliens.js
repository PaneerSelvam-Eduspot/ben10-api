
import express from 'express';
import { createAliens } from '../controllers/aliens.js'; 
import Alien from '../models/Alien.js';


const router = express.Router({ mergeParams: true });


router.get('/', async ( req, res) => {
    try{
        
       const { series, id } = req.params;
        let seriesName = "";
        
        if (series === "classic") seriesName = "Ben 10 Classic";
        else if (series === "alien-force") seriesName = "Ben 10 Alien Force";
        else if (series === "ultimate-alien") seriesName = "Ben 10 Ultimate Alien";
        
        if (!seriesName) {
            return res.status(404).json({ message: "Invalid series specified in the URL." });
        }

         if (id) {
            // If ID is provided, fetch specific alien
            const alien = await Alien.findOne({ _id: id, series: seriesName });
            if (!alien) {
                return res.status(404).json({ message: "Alien not found" });
            }
            return res.status(200).json(alien);
        }

        const aliens = await Alien.find({ series: seriesName });
        res.status(200).json(aliens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', createAliens); 

export default router;

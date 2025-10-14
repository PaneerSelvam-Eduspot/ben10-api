
import express from 'express';
import { createAliens } from '../controllers/aliens.js'; 
import Alien from '../models/Alien.js';


const router = express.Router({ mergeParams: true });


router.get('/', async ( req, res) => {
    try{
        
        const seriesParam = req.params.series; 
        let seriesName = "";
        
        
        if (seriesParam === "classic") seriesName = "Ben 10 Classic";
        else if (seriesParam === "alien-force") seriesName = "Alien Force";
        else if (seriesParam === "ultimate-alien") seriesName = "Ultimate Alien";
        
        if (!seriesName) {
            return res.status(404).json({ message: "Invalid series specified in the URL." });
        }

        const aliens = await Alien.find({ series: seriesName });
        res.status(200).json(aliens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', createAliens); 

export default router;

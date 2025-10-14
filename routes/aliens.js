
import express from 'express';
import { createAliens } from '../controllers/aliens.js'; 
import Alien from '../models/Alien.js';


const router = express.Router();


router.get('/', async ( req, res) => {
    try{
        
        let seriesName ="";
       
        if (req.baseUrl.includes("classic")) seriesName = "Ben 10 Classic";
        else if (req.baseUrl.includes("alien-force")) seriesName = "Alien Force";
        else if (req.baseUrl.includes("ultimate-alien")) seriesName = "Ultimate Alien";

        const aliens = await Alien.find({ series: seriesName });
        res.status(200).json(aliens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 


router.post('/', createAliens); 

export default router;

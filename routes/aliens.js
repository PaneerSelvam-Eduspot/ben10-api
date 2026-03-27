import express from 'express';
import { createAliens } from '../controllers/aliens.js'; 
import Alien from '../models/Alien.js';

const router = express.Router({ mergeParams: true });

const seriesMap = {
    "classic": "Ben 10 Classic",
    "alien-force": "Ben 10 Alien Force",
    "ultimate-alien": "Ben 10 Ultimate Alien"
}
router.get('/:series', async (req, res) => {
    try {
        const seriesParam = req.params.series;      
        const seriesName = seriesMap[seriesParam];
        
        if (!seriesName){
            return res.status(404).json({ message: "Series not found" });
        }

        const { name, id } = req.query; 

        let mongoQuery = { series: seriesName };

        if (name) {
            mongoQuery.name = new RegExp(name, 'i');
        }
        if (id) {
            mongoQuery.id = id;
        }
        console.log('mongoQuery:', mongoQuery);
        const aliens = await Alien.find(mongoQuery);
        res.status(200).json(aliens);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:series', createAliens); 

export default router;

import express from 'express';
import { createAliens, getAliens } from '../controllers/aliens.js'; 
import { body, validationResult } from 'express-validator';

const router = express.Router({ mergeParams: true });

router.get('/:series', getAliens);

router.post('/:series',[
    body('name').notEmpty().trim(),
    body('species').notEmpty().trim(),
], createAliens); 

export default router;

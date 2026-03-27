import express from 'express';
import { createAliens, getAlien, getAliens } from '../controllers/aliens.js'; 
import { body, validationResult } from 'express-validator';

const router = express.Router({ mergeParams: true });

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

router.get('/:series/:id', getAlien); 
router.get('/:series', getAliens);

router.post('/:series', [
    body('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('species').notEmpty().withMessage('Species is required').trim(),
    body('planet').notEmpty().withMessage('Planet is required').trim(),
    body('abilities').notEmpty().withMessage('Abilities is required').trim(),
    body('image').notEmpty().withMessage('Image is required').trim(),
    body('transform').notEmpty().withMessage('Transform image is required').trim(),
    body('series').notEmpty().withMessage('Series is required').trim(),
    body('firstAppearance').notEmpty().withMessage('First appearance is required').trim(),
    body('description').notEmpty().withMessage('Description is required').trim(),
], validate, createAliens);

export default router;

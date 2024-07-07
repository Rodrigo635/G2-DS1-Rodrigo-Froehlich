import express from 'express';
import EquipeController from '../controllers/equipeController';
import { validateEquipe } from '../middlewares/validationMiddleware';

const router = express.Router();

router.post('/', validateEquipe, EquipeController.createEquipe);
router.get('/', EquipeController.getAllEquipes);
router.delete('/:id', EquipeController.deleteEquipe);

export default router;

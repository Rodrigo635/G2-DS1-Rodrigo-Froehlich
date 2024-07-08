import { Router } from 'express';
import AvaliacaoController from '../controllers/avaliacaoController';
import { validateAvaliacao } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/', validateAvaliacao, AvaliacaoController.createAvaliacao);
router.get('/', AvaliacaoController.getAllAvaliacoes);
router.get('/equipe/:id', AvaliacaoController.getAvaliacoesByEquipe);
router.get('/avaliador/:id', AvaliacaoController.getAvaliacoesByAvaliador);

export default router;

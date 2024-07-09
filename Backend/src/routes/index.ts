import express from 'express';
import avaliacaoRoutes from './avaliacaoRoutes';
import AvaliadorController from '../controllers/avaliadorController';
import avaliadorRoutes from './avaliadorRoutes';
import equipeRoutes from './equipeRoutes';

const appRouter = express();

appRouter.post('/login', AvaliadorController.login);
appRouter.use('/avaliacao', avaliacaoRoutes);
appRouter.use('/avaliador', avaliadorRoutes);
appRouter.use('/equipe', equipeRoutes);

export default appRouter;

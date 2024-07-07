import express from 'express';
import avaliacaoRoutes from './avaliacaoRoutes';
import avaliadorRoutes from './avaliadorRoutes';
import equipeRoutes from './equipeRoutes';

const appRouter = express();

appRouter.use('/avaliacao', avaliacaoRoutes);
appRouter.use('/avaliador', avaliadorRoutes);
appRouter.use('/equipe', equipeRoutes);

export default appRouter;

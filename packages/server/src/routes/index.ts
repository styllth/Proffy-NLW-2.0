import express from 'express';

import noAuthenticatesRoutes from './noAuthenticates.routes';
import authenticatesRoutes from './authenticates.routes';

const routes = express.Router();

// rotas não autenticadas
routes.use(noAuthenticatesRoutes);

// rotas autenticadas
routes.use(authenticatesRoutes);

export default routes;

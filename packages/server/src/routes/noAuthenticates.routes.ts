import express from 'express';

import AuthController from '../app/controllers/authController';

const noAuthenticatesRoutes = express.Router();
const authController = new AuthController();

/**
 * Rotas não autenticadas
 */
noAuthenticatesRoutes
  .get('/', (req, res) => {
    return res.json({
      msg: 'Hello Next Level Week #2.0'
    });
  })
  .post('/authenticate', authController.login)
  .post('/register', authController.register);

export default noAuthenticatesRoutes;

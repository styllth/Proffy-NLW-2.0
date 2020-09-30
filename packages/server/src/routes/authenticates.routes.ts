import express from 'express';
import multer from 'multer';

import multerConfig from '../config/multer';

import authMiddleware from '../app/middlewares/auth';

import UserController from '../app/controllers/userController';
import ClassesController from '../app/controllers/classesController';
import MediaController from '../app/controllers/mediaController';
import ConnectionsController from '../app/controllers/connectionsController';

const authenticatesRoutes = express.Router();
const upload = multer(multerConfig);
const userController = new UserController();
const classesController = new ClassesController();
const mediaController = new MediaController();
const connectionsController = new ConnectionsController();

// Autenticação do Header Authorization em todas as rotas
authenticatesRoutes.use(authMiddleware);

/**
 * Rotas /api/users/
 * default Controllers = index, show, create, update, delete
 */
authenticatesRoutes
  .get('/users', userController.index)
  .get('/users/:user_id', userController.show)
  .post('/users', userController.create)
  .put('/users/:user_id/edit', userController.update)
  .delete('/users/:user_id', userController.delete);

/**
 * Rota /api/classes/
 * default Controllers = index, show, create, update, delete
 */
authenticatesRoutes
  .get('/classes', classesController.index)
  .get('/classes/:class_id', classesController.show)
  .post('/classes', classesController.create)
  .put('/classes/:class_id/edit', classesController.update)
  .delete('/classes/:class_id', classesController.delete)

  // mediaController
  .get('/classes/:class_id/listMedia', mediaController.index)
  .post(
    '/classes/:class_id/newMedia',
    upload.array('files', 6),
    mediaController.create
  );

/**
 * Rota /api/connections/
 * default Controllers = index, show, create, update, delete
 */

authenticatesRoutes
  .get('/connections', connectionsController.index)
  // .get('/connections/:connection_id', connectionsController.show)
  .post('/connections', connectionsController.create);
// .put('/connections/:connection_id/edit', connectionsController.update)
// .delete('/connections/:connection_id', connectionsController.delete)

export default authenticatesRoutes;

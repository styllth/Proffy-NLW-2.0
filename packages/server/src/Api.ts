import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';

import routes from './routes';

export default class Api {
  server: Express;

  constructor() {
    this.server = express();
    this.cors();
    this.middlewares();
    this.routes();
  }

  cors() {
    this.server.use(cors());
    /* set optional cors
    {
      origin:'http://host'
    }
    */
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/v1', routes);
    this.server.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  init() {
    const port = process.env.PORT_APP || 3333;
    this.server.listen(port, () => {
      console.log(`Server running in port: ${port}`);
    });
  }
}

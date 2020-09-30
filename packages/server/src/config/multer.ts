import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import { Request } from 'express';
export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request: Request, file, callback) => {
      const Hash = crypto.randomBytes(6).toString('hex');

      const filename = `${Hash}-${file.originalname.replaceAll(' ', '-')}`;

      callback(null, filename);
    }
  })
};

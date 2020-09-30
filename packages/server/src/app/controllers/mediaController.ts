import { Request, Response } from 'express';
import 'dotenv/Config';

import db from '../../database/connection';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
}

interface Media {
  id: Number;
  title: string;
  description: string;
  name: string;
}

export default class MediaController {
  async index(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const class_id = Number(request.params.class_id);

    const media: Media[] = await db('classes')
      .where('classes.id', class_id)
      .join('media', 'classes.id', '=', 'media.class_id')
      .select('media.*');

    // Processo de virtualização dos campos do banco.
    const serializedMedia = media.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      url: `${process.env.HOST_APP}/uploads/${item.name}`
    }));

    return response.json(serializedMedia);
  }

  async create(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const class_id = Number(request.params.class_id);
    const files = request.files as File[];
    const { title, description } = request.body;

    try {
      files.map(async file => {
        await db('media').insert({
          class_id,
          name: file.filename,
          title,
          description
        });
      });

      return response
        .status(201)
        .json({ class_id, files, title, description, status: 'created' });
    } catch (err) {
      console.log(err);

      return response.status(400).json({
        error: 'Unexpected error while deleting the class'
      });
    }
  }
}

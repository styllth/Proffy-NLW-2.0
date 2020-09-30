import { Request, Response } from 'express';

import db from '../../database/connection';
import { generateHash } from '../models/user';

interface User {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

export default class UserController {
  async index(request: Request, response: Response) {
    const { search = '' } = request.query;

    const users: User[] = await db('users')
      .select('*')
      .where('name', 'like', `%${String(search)}%`);

    users.map(user => {
      delete user.password;
    });

    return response.status(200).json(users);
  }

  async show(request: Request, response: Response): Promise<Response<unknown>> {
    const { user_id } = request.params;

    const trx = await db.transaction();

    try {
      const subjects = [];
      const [user] = await trx('users').where('id', '=', Number(user_id));
      delete user.password;
      const classes = await trx('classes')
        .join('users', 'classes.user_id', '=', 'users.id')
        .where('users.id', '=', Number(user_id))
        .select('classes.id as class_id', 'classes.*');

      for (const key in classes) {
        if (Object.prototype.hasOwnProperty.call(classes, key)) {
          const classe = classes[key];

          const schedule = await trx('class_schedule')
            .select('*')
            .where('class_id', '=', classe.class_id);

          subjects.push(classe.subject);
          classe.class_schedule = schedule;
          delete classe.password;
          delete classe.id;
        }
      }

      await trx.commit();

      return response.json({ user, subjects, classes });
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while showing the classes for the user'
      });
    }
  }

  async create(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const { name, email, password } = request.body;

    const verify = await db('users').where('email', String(email)).distinct();

    if (verify.length > 0)
      response.status(400).json({ error: 'User already exists' });

    const [id] = await db('users').insert({
      email,
      name,
      password: await generateHash(password)
    });

    if (!id)
      return response.status(400).json({ error: 'User registration failed' });

    return response.status(201).json({ id });
  }

  async update(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const { user_id } = request.params;
    let {
      name = null,
      email = null,
      password = null,
      bio = null,
      avatar = null,
      whatsapp = null
    } = request.body;

    const [user] = await db('users')
      .select('*')
      .where('id', String(user_id))
      .distinct();

    if (!user) response.status(400).json({ error: 'User not found' });
    if (!password) password = user.password;
    if (!email) email = user.email;
    if (!name) name = user.name;

    await db('users').where('id', user_id).update({
      name,
      email,
      password,
      bio,
      avatar,
      whatsapp
    });

    return response.status(201).send();
  }

  async delete(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const { user_id } = request.params;

    const [user] = await db('users').select('*').where('id', user_id);

    if (!user) response.status(400).json({ error: 'User not found' });

    await db('users').where('id', user_id).delete();

    return response.status(200).json({ user: user, status: 'deleted' });
  }
}

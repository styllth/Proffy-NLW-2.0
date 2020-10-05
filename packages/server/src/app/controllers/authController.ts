import { Request, Response } from 'express';

import db from '../../database/connection';
import { compareHash, generateHash, generateToken } from '../models/user';

export default class AuthController {
  async login(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const { email, password } = request.body;

    const [user] = await db('users')
      .select('*')
      .where('email', String(email))
      .distinct();

    if (!user) response.status(400).json({ error: 'User not found' });

    const assignUser = await compareHash(user.password, String(password));

    if (!assignUser) response.status(400).json({ error: 'Invalid password' });

    return response.json({
      user,
      token: generateToken(Number(user.id))
    });
  }

  async register(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const { name, email, password, avatar, whatsapp, bio } = request.body;

    const verify = await db('users').where('email', String(email)).distinct();

    if (verify.length > 0)
      response.status(400).json({ error: 'User already exists' });

    const userId = await db('users').insert({
      email,
      name,
      password: await generateHash(password),
      avatar,
      whatsapp,
      bio
    });

    if (!userId)
      return response.status(400).json({ error: 'User registration failed' });

    return response.status(201).json({ userId });
  }
}

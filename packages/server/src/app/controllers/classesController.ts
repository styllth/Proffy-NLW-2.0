import { Request, Response } from 'express';

import db from '../../database/connection';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

interface Schedule extends ScheduleItem {
  id: number;
}

export default class ClassController {
  async index(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const filters = request.query;

    const week_day = Number(filters.week_day);
    const subject = String(filters.subject);
    const time = String(filters.time);

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const trx = await db.transaction();

    try {
      const classes = await trx('classes')
        .whereExists(function () {
          this.select('class_schedule.*')
            .from('class_schedule')
            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
            .whereRaw('`class_schedule`.`week_day` = ??', [week_day])
            .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
            .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
        })
        .where('classes.subject', 'like', `%${subject}%`)
        // .join('midia', 'classes.id', '=', 'midia.class_id')
        .join('users', 'classes.user_id', '=', 'users.id')
        .select('classes.id as class_id', 'classes.*', 'users.*');

      for (const key in classes) {
        if (Object.prototype.hasOwnProperty.call(classes, key)) {
          const classe = classes[key];

          const schedule = await trx('class_schedule')
            .select('*')
            .where('class_id', '=', classe.class_id);

          classe.class_schedule = schedule;
          delete classe.password;
          delete classe.id;
        }
      }

      await trx.commit();

      return response.json(classes);
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while list the classes'
      });
    }
  }

  async show(request: Request, response: Response): Promise<Response<unknown>> {
    const { class_id } = request.params;

    const trx = await db.transaction();

    try {
      const Class = (
        await trx('classes')
          .join('users', 'classes.user_id', '=', 'users.id')
          .where('classes.id', '=', Number(class_id))
          .select('classes.id as class_id', 'classes.*', 'users.*')
      )[0];

      const schedules = await trx('class_schedule')
        .select('*')
        .where('class_id', '=', Class.class_id);

      delete Class.password;
      delete Class.id;

      await trx.commit();

      return response.json({ ...Class, schedules });
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while search class'
      });
    }
  }

  async create(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const user_id = request.headers.user_id;
    const { description, subject, cost, schedule } = request.body;

    const verifyClass = await db('classes')
      .join('users', 'classes.user_id', '=', 'users.id')
      .where('users.id', '=', Number(user_id))
      .where('classes.subject', '=', String(subject))
      .first();

    if (verifyClass) {
      return response
        .status(400)
        .json({ error: 'A class with this subject is already registered' });
    }

    const trx = await db.transaction();

    try {
      const [class_id] = await trx('classes').insert({
        subject,
        cost,
        description,
        user_id
      });

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      });

      await trx('class_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).json({ msg: 'Class created' });
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }

  async update(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const user_id = request.headers.user_id;

    let { class_id, subject, description, cost, schedule } = request.body;

    const [Class] = await db('classes')
      .select('*')
      .where('id', Number(class_id))
      .distinct();

    if (!Class) response.status(400).json({ error: 'Class not found' });
    if (!subject) subject = Class.subject;
    if (!description) description = Class.description;
    if (!cost) cost = Class.cost;
    if (!schedule) schedule = Class.schedule;

    const trx = await db.transaction();

    try {
      await trx('classes').where('id', Number(class_id)).update({
        subject,
        description,
        cost
      });

      for (const key in schedule) {
        if (Object.prototype.hasOwnProperty.call(schedule, key)) {
          const scheduleItem = schedule[key] as Schedule;

          await trx('class_schedule')
            .where('id', scheduleItem.id)
            .where('class_id', class_id)
            .update({
              week_day: scheduleItem.week_day,
              from: convertHourToMinutes(scheduleItem.from),
              to: convertHourToMinutes(scheduleItem.to)
            });
        }
      }

      await trx.commit();

      return response.status(201).json({ msg: 'Class Updated' });
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while updating the class'
      });
    }
  }

  async delete(
    request: Request,
    response: Response
  ): Promise<Response<unknown>> {
    const { class_id } = request.params;

    const [Class] = await db('classes')
      .select('*')
      .where('id', Number(class_id))
      .distinct();

    if (!Class) response.status(400).json({ error: 'Class not found' });

    const trx = await db.transaction();

    try {
      await trx('classes').where('id', Number(class_id)).delete();

      await trx('class_schedule').where('class_id', class_id).delete();

      await trx.commit();

      return response.status(200).json({ Class, status: 'deleted' });
    } catch (err) {
      console.log(err);

      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while deleting the class'
      });
    }
  }
}

import React, { useState, FormEvent } from 'react';
import api from '@proffy/axios-config';

import { daysOfTheWeek } from './../../utils/daysOfTheWeek';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from './../../components/Select/index';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Empty from './components/Empty';

import { PageTeacherList, SearchTeachers } from './styles';

const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    console.log({
      subject,
      week_day,
      time
    });
    await api
      .get('classes', {
        params: {
          subject,
          week_day,
          time
        }
      })
      .then(resp => setTeachers(resp.data))
      .catch(error => alert(error.message));
  }

  return (
    <PageTeacherList>
      <PageHeader
        pageName="Procurar Professores"
        title="Estes são os proffys disponíveis."
      >
        <SearchTeachers onSubmit={searchTeachers}>
          <Input
            type="text"
            label="Matéria"
            name="subject"
            onChange={e => setSubject(e.target.value)}
            placeholder="Digite parte do nome"
            required
          />

          <Select
            label="Dia da semana"
            name="week_day"
            options={daysOfTheWeek()}
            onChange={e => setWeek_day(e.value)}
            required
          />

          <Input
            type="time"
            label="Hora"
            name="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />

          <button type="submit">Buscar</button>
        </SearchTeachers>
      </PageHeader>

      <main>
        {teachers &&
          teachers.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher} />;
          })}

        {teachers.length === 0 && <Empty />}
      </main>
    </PageTeacherList>
  );
};

export default TeacherList;

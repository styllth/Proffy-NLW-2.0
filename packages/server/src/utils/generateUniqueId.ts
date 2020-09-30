import { randomBytes } from 'crypto';
import connection from '../database/connection';

// Gerar novo ID único
function genareteUniqueId() {
  return checkId(randomBytes(4).toString('hex'));
}

async function checkId(id: any) {
  // Vai retornar verdadeiro se o id existir
  const ongWithIdExist = await connection('users')
    .select('*')
    .where({ id })
    .first();

  while (ongWithIdExist) {
    id = genareteUniqueId();
  }

  return id;
}

export default () => genareteUniqueId();

import { getDB, saveDB } from '../../utils/db/index.js';
import { hash } from 'bcrypt';

const saltRound = 10;

export const createUser = async (request, reply) => {
  const { body } = request;
  const { username, password, firstName, lastName } = body;

  const hashedPassword = await hash(password, saltRound);

  const db = await getDB();

  if (db.users[username]) {
    return reply.badRequest('Username already exists');
  }

  const user = {
    hashedPassword,
    firstName,
    lastName,
    createdDate: new Date().getTime(),
    updatedDate: new Date().getTime()
  };

  db.users[username] = user;

  await saveDB(db);

  return {
    username,
    ...user
  };
};

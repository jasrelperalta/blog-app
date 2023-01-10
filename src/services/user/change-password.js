import { getDB, saveDB } from '../../utils/db/index.js';
import { hash } from 'bcrypt';
import { compare } from 'bcrypt';

const saltRound = 10;

export const changePassword = async (request, reply) => {
  const { body, username } = request;
  const { username: inputUser, oldPassword, newPassword } = body;

  const newHashedPassword = await hash(newPassword, saltRound);

  const db = await getDB();
  
  if (inputUser !== username) {
    return reply.unauthorized('Invalid username');
  }

  if (!await compare(oldPassword, db.users[username].hashedPassword)) {
    return reply.unauthorized('Invalid old password');
  }

  db.users[username].hashedPassword = newHashedPassword;
  db.users[username].updatedDate = new Date().getTime();

  await saveDB(db);

  return {
    username,
    ...db.users[username]
  };
};

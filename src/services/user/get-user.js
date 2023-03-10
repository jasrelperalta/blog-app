import { getDB } from '../../utils/db/index.js';

export const getUser = async (request, reply) => {
  const { params } = request;
  const { userId } = params;
  const db = await getDB();

  const { users } = db;

  if (!users[userId]) {
    return reply.notFound('User does not exist');
  }

  return {
    userId,
    ...users[userId]
  };
};

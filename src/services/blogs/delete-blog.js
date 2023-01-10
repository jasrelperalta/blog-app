import { getDB, saveDB } from '../../utils/db/index.js';

export const deleteBlog = async (request, reply) => {
  const { params, username } = request;
  const { blogId: id } = params;

  const db = await getDB();

  if (db.blogs[id].username !== username) {
    return reply.forbidden('Not the blog author');
  }

  delete db.blogs[id];

  await saveDB(db);

  return {
    success: true
  };
};

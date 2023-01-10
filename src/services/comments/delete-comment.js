import { getDB, saveDB } from '../../utils/db/index.js';

export const deleteComment = async (request, reply) => {
  const { params, username } = request;
  const { blogId, commentId } = params;

  const db = await getDB();

  if (db.blogs[blogId].comments[commentId].username !== username) {
    return reply.forbidden('Not the blog author');
  }

  delete db.blogs[blogId].comments[commentId];

  await saveDB(db);

  return {
    success: true
  };
};

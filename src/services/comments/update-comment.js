import { getDB, saveDB } from '../../utils/db/index.js';

export const updateComment = async (request, reply) => {
  const { params, body, username } = request;
  const { blogId, commentId } = params;
  const { text } = body;

  const db = await getDB();

  if (db.blogs[blogId].comments[commentId].username !== username) {
    return reply.forbidden('Not the blog author');
  }

  db.blogs[blogId].comments[commentId].text = text;
  db.blogs[blogId].comments[commentId].updatedDate = new Date().getTime();

  await saveDB(db);

  return {
    commentId,
    ...db.blogs[blogId].comments[commentId]
  };
};

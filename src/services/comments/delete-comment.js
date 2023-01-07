import { getDB, saveDB } from '../../utils/db/index.js';

export const deleteComment = async (request, reply) => {
  const { params } = request;
  const { blogId, commentId } = params;
  const db = await getDB();

  delete db.blogs[blogId].comments[commentId];

  await saveDB(db);

  return {
    success: true
  };
};

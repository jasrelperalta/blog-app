import { getDB, saveDB } from '../../utils/db/index.js';
import { v4 } from 'uuid';

export const createComment = async (request, reply) => {
  const { params, body } = request;
  const { blogId: id } = params;
  const { text } = body;
  const db = await getDB();

  const commentId = v4();

  const comment = {
    text,
    createdDate: new Date().getTime(),
    updatedDate: new Date().getTime()
  };

  db.blogs[id].comments[commentId] = comment;

  await saveDB(db);

  return {
    id,
    ...db.blogs[id].comments[commentId]
  };
};

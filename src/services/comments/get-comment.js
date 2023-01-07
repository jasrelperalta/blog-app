import { getDB } from '../../utils/db/index.js';

export const getComment = async (request, reply) => {
  const { params } = request;
  const { blogId, commentId } = params;
  const db = await getDB();

  const { comments } = db.blogs[blogId];

  if (!comments[commentId]) {
    return reply.notFound();
  }

  return {
    commentId,
    ...comments[commentId]
  };
};

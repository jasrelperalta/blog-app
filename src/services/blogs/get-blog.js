import { getDB } from '../../utils/db/index.js';

export const getBlog = async (request, reply) => {
  const { params } = request;
  const { blogId: id } = params;
  const db = await getDB();

  const { blogs } = db;

  if (!blogs[id]) {
    return reply.notFound('Blog not found');
  }

  return {
    id,
    ...blogs[id]
  };
};

import { getDB, saveDB } from '../../utils/db/index.js';

export const updateBlog = async (request, reply) => {
  const { params, body, username } = request;
  const { blogId: id } = params;
  const { title, desc, comments } = body;

  const db = await getDB();

  if (db.blogs[id].username !== username) {
    return reply.forbidden('Not the blog author');
  }

  db.blogs[id].title = title || db.blogs[id].title;
  db.blogs[id].desc = desc || db.blogs[id].desc;
  db.blogs[id].comments = comments || db.blogs[id].comments;
  db.blogs[id].updatedDate = new Date().getTime();

  await saveDB(db);

  return {
    id,
    ...db.blogs[id]
  };
};

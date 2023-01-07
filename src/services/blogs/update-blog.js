import { getDB, saveDB } from '../../utils/db/index.js';

export const updateBlog = async (request, reply) => {
  const { params, body } = request;
  const { blogId: id } = params;
  const { title, desc } = body;
  const db = await getDB();

  db.blogs[id].title = title || db.blogs[id].title;
  db.blogs[id].desc = desc || db.blogs[id].desc;
  db.blogs[id].updatedDate = new Date().getTime();

  await saveDB(db);

  return {
    id,
    ...db.blogs[id]
  };
};

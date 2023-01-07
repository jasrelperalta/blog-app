import { getDB, saveDB } from '../../utils/db/index.js';

export const deleteBlog = async (request, reply) => {
  const { params } = request;
  const { blogId: id } = params;
  const db = await getDB();

  delete db.blogs[id];

  await saveDB(db);

  return {
    success: true
  };
};

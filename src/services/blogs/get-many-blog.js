import { getDB } from '../../utils/db/index.js';

export const getManyBlog = async (request, reply) => {
  const { query } = request;
  const { limit = 5 } = query;
  const db = await getDB();

  const list = [];

  const blogs = Object
    .entries(db.blogs)
    .map(([id, blog]) => {
      return {
        id,
        ...blog
      };
    })
    .sort(function (blog1, blog2) {
      return blog2.createdDate - blog1.createdDate;
    });

  for (const blog of blogs) {
    list.push(blog);
    if (list.length >= limit) {
      break;
    }
  }

  return list;
};

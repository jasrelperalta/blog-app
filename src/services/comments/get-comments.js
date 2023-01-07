import { getDB } from '../../utils/db/index.js';

export const getComments = async (request, reply) => {
  const { params, query } = request;
  const { blogId: id } = params;
  const { limit = 5 } = query;
  const db = await getDB();

  const list = [];

  const comments = Object
    .entries(db.blogs[id].comments)
    .map(([id, comment]) => {
      return {
        id,
        ...comment
      };
    })
    .sort(function (comment1, comment2) {
      return comment2.createdDate - comment1.createdDate;
    });

  for (const comment of comments) {
    list.push(comment);
    if (list.length >= limit) {
      break;
    }
  }

  return list;
};

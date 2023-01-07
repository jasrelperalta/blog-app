import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import { createBlog } from './services/blogs/create-blog.js';
import { deleteBlog } from './services/blogs/delete-blog.js';
import { getBlog } from './services/blogs/get-blog.js';
import { getManyBlog } from './services/blogs/get-many-blog.js';
import { updateBlog } from './services/blogs/update-blog.js';
import { general } from './services/general/index.js';
import { createComment } from './services/comments/create-comment.js';
import { getComments } from './services/comments/get-comments.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  // returns { success : true }from /general/index.js
  fastify.get(prefix, general);

  // create blog
  fastify.post(`${prefix}/blog`, createBlog);
  // get many blogs
  fastify.get(`${prefix}/blog`, getManyBlog);
  // get a blog
  fastify.get(`${prefix}/blog/:blogId`, getBlog);
  // update a blog
  fastify.put(`${prefix}/blog/:blogId`, updateBlog);
  // delete a blog
  fastify.delete(`${prefix}/blog/:blogId`, deleteBlog);

  // create comment
  fastify.post(`${prefix}/blog/:blogId/comment`, createComment);
  // get comments of a blog
  fastify.get(`${prefix}/blog/:blogId/comment`, getComments);

  return fastify;
}

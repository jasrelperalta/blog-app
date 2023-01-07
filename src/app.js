import Fastify from 'fastify';
import { createBlog } from './services/blogs/create-blog.js';
import { general } from './services/general/index.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });

  // returns { success : true }from /general/index.js
  fastify.get(prefix, general);

  // create blog
  fastify.post(`${prefix}/blog`, createBlog);

  return fastify;
}

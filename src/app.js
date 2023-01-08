import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const openAPIGlueOptions = {
    prefix
  };

  const swaggerOptions = {
    exposeRoute: true
  };


  fastify.register(swagger, swaggerOptions);
  fastify.register(openAPIGlue, openAPIGlueOptions);

  
  // // returns { success : true }from /general/index.js
  // fastify.get(prefix, general);

  // // create blog
  // fastify.post(`${prefix}/blog`, createBlog);
  // // get many blogs
  // fastify.get(`${prefix}/blog`, getManyBlog);
  // // get a blog
  // fastify.get(`${prefix}/blog/:blogId`, getBlog);
  // // update a blog
  // fastify.put(`${prefix}/blog/:blogId`, updateBlog);
  // // delete a blog
  // fastify.delete(`${prefix}/blog/:blogId`, deleteBlog);

  // // create comment
  // fastify.post(`${prefix}/blog/:blogId/comment`, createComment);
  // // get comments of a blog
  // fastify.get(`${prefix}/blog/:blogId/comment`, getManyComment);
  // // get a comment of a blog
  // fastify.get(`${prefix}/blog/:blogId/comment/:commentId`, getComment);
  // // get comments of a blog
  // fastify.put(`${prefix}/blog/:blogId/comment/:commentId`, updateComment);
  // // delete a comment of a blog
  // fastify.delete(`${prefix}/blog/:blogId/comment/:commentId`, deleteComment);

  return fastify;
}

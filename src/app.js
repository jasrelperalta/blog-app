import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import cookie from '@fastify/cookie';
import session from '@fastify/secure-session';
import jwt from '@fastify/jwt';
import { specification } from './specification/index.js';
import { Service } from './services/index.js';
import { Security } from './security/index.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });

  fastify.register(cookie);
  fastify.register(session, {
    secret: 'Long long long long longer than 32 bytes string for the secret',
    salt: '1234567890123456',
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60
    }
  });

  fastify.register(jwt, {
    secret: 'Long long long long long longer than 32 bytes string for jwt secret'
  });

  fastify.register(sensible);

  const service = new Service();
  const securityHandlers = new Security(fastify);

  const openAPIGlueOptions = {
    specification,
    service,
    securityHandlers,
    prefix
  };

  const swaggerOptions = {
    openapi: specification,
    routePrefix: '/docs',
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

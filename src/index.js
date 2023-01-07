import Fastify from 'fastify';

async function start () {
  try {
    // initialize fastify
    const fastify = Fastify( { logger: true });
    fastify.get('/api', async (request, reply) => {
      return {success: true};
    });

    const addr = await fastify.listen({
      port: '8080'
    })

    console.log(`Listening on ${addr}`)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
} 

start();
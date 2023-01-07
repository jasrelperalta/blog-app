import { build } from './app.js';

async function start () {
  try {
    const fastify = await build();

    const addr = await fastify.listen({
      port: '8080'
    });

    console.log(`Listening on ${addr}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();

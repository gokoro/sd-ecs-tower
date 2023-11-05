import Fastify from 'fastify'

import { isAppError } from './libs/error.js'
import { routes } from './routes/index.js'

const PORT = 3000

const fastify = Fastify({ logger: true })

fastify.register(routes)

fastify.setErrorHandler((error, req, reply) => {
  reply.statusCode = error.statusCode ?? 500

  if (isAppError(error)) {
    return {
      message: error.message,
    }
  }

  fastify.log.error(error)

  return error
})

fastify
  .listen({ port: PORT, host: '0.0.0.0' })
  .then(() => console.log(`SD-ECS-TOWER is listning on port ${PORT}!`))

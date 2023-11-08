import type { FastifyPluginAsync } from 'fastify'

import { providersRoutes } from './providers/index.js'
import { weightsRoutes } from './weights/index.js'

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(weightsRoutes, { prefix: '/weights' })
  fastify.register(providersRoutes, { prefix: '/providers' })
}

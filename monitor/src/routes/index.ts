import type { FastifyPluginAsync } from 'fastify'

import { weightsRoutes } from './weights/index.js'

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(weightsRoutes, { prefix: '/weights' })
}

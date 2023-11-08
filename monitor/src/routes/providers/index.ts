// GET: /provider/weights (context, provider={civitai,huggingface,custom})

import type { FastifyPluginAsyncTypebox } from '../types.js'
import type {
  ProviderWeightGetQueryType,
  ProviderWeightGetResponseType,
} from './schema.js'

import { providersHandler } from '../../handlers/providers.handler.js'
import { ProviderWeightGetQuery, ProviderWeightGetResponse } from './schema.js'

export const providersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get<{
    Querystring: ProviderWeightGetQueryType
    Reply: ProviderWeightGetResponseType
  }>(
    `/metadata`,
    {
      schema: {
        querystring: ProviderWeightGetQuery,
        response: {
          200: ProviderWeightGetResponse,
        },
      },
    },
    async (req, reply) => {
      const { context, provider } = req.query

      return await providersHandler({ context, provider })
    }
  )
}

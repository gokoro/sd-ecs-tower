import type { FastifyPluginAsyncTypebox } from '../types.js'

import { weightsHandler } from '../../handlers/weights.handler.js'
import { weightTypes } from '../../libs/types.js'
import {
  WeightApplyRequest,
  WeightApplyRequestType,
  WeightRequest,
  WeightRequestType,
  WeightResponseSuccess,
  WeightResponseSuccessType,
} from './schema.js'

export const weightsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  for (const weightType of weightTypes) {
    fastify.post<{
      Body: WeightRequestType
      Reply: WeightResponseSuccessType
    }>(
      `/${weightType}`,
      {
        schema: {
          body: WeightRequest,
          response: {
            200: WeightResponseSuccess,
          },
        },
      },
      async (req, reply) => {
        const { weightUrl } = req.body

        return await weightsHandler({ type: weightType, weightUrl })
      }
    )

    fastify.post<{
      Body: WeightApplyRequestType
    }>(
      `/${weightType}/apply`,
      {
        schema: {
          body: WeightApplyRequest,
        },
      },
      async (req, reply) => {
        const { downloadUrl } = req.body

        // const output = await weightsHandler({ weightUrl })
      }
    )
  }
}

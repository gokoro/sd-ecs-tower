import type { FastifyPluginAsyncTypebox } from '../types.js'

import {
  weightsApplyHandler,
  weightsHandler,
} from '../../handlers/weights.handler.js'
import { weightTypes } from '../../libs/types.js'
import {
  WeightApplyRequest,
  type WeightApplyRequestType,
  WeightRequest,
  type WeightRequestType,
  WeightResponseSuccess,
  type WeightResponseSuccessType,
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

    fastify.get<{
      Querystring: WeightApplyRequestType
    }>(
      `/${weightType}/apply`,
      {
        schema: {
          querystring: WeightApplyRequest,
        },
      },
      async (req, reply) => {
        const { downloadUrl, filename } = req.query

        const sender = (data: object) => {
          reply.sse({ data: JSON.stringify(data) })
        }

        const ender = () => {
          reply.sse({ event: 'close' })
        }

        await weightsApplyHandler({
          type: weightType,
          filename,
          downloadUrl,
          sse: {
            sender,
            ender,
          },
        })
      }
    )
  }
}

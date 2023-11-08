import type { FastifyPluginAsyncTypebox } from '../types.js'
import type {
  WeightDeleteRequestType,
  WeightDeleteResponseSuccessType,
  WeightGetResponseType,
  WeightIdParamType,
  WeightPostRequestType,
  WeightPostResponseSuccessType,
  WeightProgressDeleteResponseSuccessType,
} from './schema.js'

import {
  weightsPostHandler,
  weightsProgressDeleteHandler,
  weightsProgressGetHandler,
} from '../../handlers/weights.handler.js'
import {
  WeightDeleteRequest,
  WeightDeleteResponseSuccess,
  WeightIdParam,
  WeightPostRequest,
  WeightPostResponseSuccess,
  WeightProgressDeleteResponseSuccess,
} from './schema.js'

export const weightsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post<{
    Body: WeightPostRequestType
    Reply: WeightPostResponseSuccessType
  }>(
    `/`,
    {
      schema: {
        body: WeightPostRequest,
        response: {
          200: WeightPostResponseSuccess,
        },
      },
    },
    async (req, reply) => {
      const { type, url, filename } = req.body

      const id = await weightsPostHandler({ type, url, filename })

      return { id }
    }
  )

  // fastify.get<{
  //   Reply: WeightGetResponseType
  // }>(
  //   `/`,
  //   {
  //     schema: {
  //       body: WeightPostRequest,
  //       response: {
  //         200: WeightPostResponseSuccess,
  //       },
  //     },
  //   },
  //   async (req, reply) => {
  //     return []
  //     // return await weightsHandler({ type, weightUrl })
  //   }
  // )

  fastify.delete<{
    Body: WeightDeleteRequestType
    Reply: WeightDeleteResponseSuccessType
  }>(
    `/:id`,
    {
      schema: {
        body: WeightDeleteRequest,
        response: {
          200: WeightDeleteResponseSuccess,
        },
      },
    },
    async (req, reply) => {
      const { id } = req.body

      return { status: true }
    }
  )

  fastify.get<{
    Params: WeightIdParamType
  }>(
    `/:id/progress`,
    {
      schema: {
        params: WeightIdParam,
      },
    },
    async (req, reply) => {
      const { id } = req.params

      const sender = (data: object) => {
        reply.sse({ data: JSON.stringify(data) })
      }

      const ender = () => {
        reply.sse({ event: 'close' })
      }

      await weightsProgressGetHandler({
        id,
        sse: {
          sender,
          ender,
        },
      })
    }
  )

  fastify.delete<{
    Params: WeightIdParamType
    Reply: WeightProgressDeleteResponseSuccessType
  }>(
    `/:id/progress`,
    {
      schema: {
        params: WeightIdParam,
        response: { 200: WeightProgressDeleteResponseSuccess },
      },
    },
    async (req, reply) => {
      const { id } = req.params

      await weightsProgressDeleteHandler({
        id,
      })

      return { status: true }
    }
  )
}

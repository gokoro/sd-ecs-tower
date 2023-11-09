import type { WeightTypes } from '../libs/types.js'

import { AppError } from '../libs/error.js'
import { md5 } from '../libs/hash.js'
import { client } from '../libs/redis.js'
import { trpc } from '../libs/trpc.js'

interface Metadata {
  downloadUrl: string
  filename: string
  id: string
  type: string
}

interface WeightsPostHandlerInput {
  filename: string
  type: WeightTypes
  url: string
}

interface WeightsProgressGetHandlerInputSSE {
  ender: () => void
  sender: (data: any) => void
}

interface WeightsProgressGetHandlerInput {
  id: string
  sse: WeightsProgressGetHandlerInputSSE
}

interface WeightsProgressDeleteHandlerInput {
  id: string
}

export const weightsPostHandler = async (
  input: WeightsPostHandlerInput
): Promise<string> => {
  const { filename, type, url } = input
  const hash = md5(filename)

  const ifExist = await client.sIsMember('tw:weights', hash)
  console.log('ifExist:', ifExist)

  if (ifExist) {
    return hash
  }

  const metadata = {
    filename,
    type,
    downloadUrl: url,
  }

  const jobId = await trpc.weights.addWeight.mutate(metadata)

  await client
    .multi()
    .sAdd('tw:weights', hash)
    .hSet('tw:weights:metadata', hash, JSON.stringify(metadata))
    .hSet('tw:weights:jobs', hash, jobId)
    .exec()

  return hash
}

export const weightsGetHandler = async (): Promise<Metadata[]> => {
  const metadata = await client.hGetAll('tw:weights:metadata')

  return Object.keys(metadata).map((id) => ({
    id,
    ...JSON.parse(metadata[id]),
  }))
}

export const weightsProgressGetHandler = async (
  input: WeightsProgressGetHandlerInput
) => {
  const { id } = input
  const jobId = await client.hGet('tw:weights:jobs', id)

  if (!jobId) {
    throw new AppError(400, 'jobId not found')
  }

  await new Promise<void>(async (resolve) => {
    trpc.weights.onAddWeight.subscribe(
      { id: jobId },
      {
        onData(per) {
          input.sse?.sender({ percentage: per })
        },
        onComplete() {
          input.sse?.ender()
          resolve()
        },
      }
    )
  })
}

export const weightsProgressDeleteHandler = async (
  input: WeightsProgressDeleteHandlerInput
) => {
  const { id } = input
  const jobId = await client.hGet('tw:weights:jobs', id)

  if (!jobId) {
    throw new AppError(400, 'jobId not found')
  }

  return await trpc.weights.deleteWeightQueue.mutate({
    id: jobId,
  })
}

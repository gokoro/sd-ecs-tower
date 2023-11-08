import type { WeightTypes } from '../libs/types.js'

import { trpc } from '../libs/trpc.js'

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

  return await trpc.weights.addWeight.mutate({
    filename,
    type,
    downloadUrl: url,
  })
}

export const weightsProgressGetHandler = async (
  input: WeightsProgressGetHandlerInput
) => {
  const { id } = input

  await new Promise<void>(async (resolve) => {
    trpc.weights.onAddWeight.subscribe(
      { id },
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
  return await trpc.weights.deleteWeightQueue.mutate({
    id,
  })
}

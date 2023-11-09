import { observable } from '@trpc/server/observable'
import got from 'got'
import { Progress } from 'got'
import { randomUUID } from 'node:crypto'
import { EventEmitter } from 'node:events'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { ZodLiteral, z } from 'zod'

import * as configs from '../../configs/index.js'
import { publicProcedure, router } from '../../libs/trpc.js'

type WeightType =
  | 'checkpoint'
  | 'lora'
  | 'lycoris'
  | 'textual-inversion'
  | 'vae'

interface WeightTypeStruct {
  pathToSave: string
  type: WeightType
}

const QueueMap: {
  [key: string]: {
    event: EventEmitter
    filename: string
    id: string
  }
} = {}

function createQueue(id: string, filename: string) {
  QueueMap[id] = {
    event: new EventEmitter(),
    id,
    filename,
  }

  return QueueMap[id]
}

function getQueue(id: string) {
  return QueueMap[id]
}

function getQueueByFilename(filename: string) {
  for (const key in QueueMap) {
    const queue = QueueMap[key]

    if (queue.filename === filename) {
      return queue
    }

    continue
  }
}

function deleteQueue(id: string) {
  if (getQueue(id)) {
    delete QueueMap[id]
  }
}

const createStreamForWeight = (url: string) => got.stream(url)

const weightTypes: WeightTypeStruct[] = [
  {
    type: 'checkpoint',
    pathToSave: configs.checkpointPath,
  },
  {
    type: 'lora',
    pathToSave: configs.loraPath,
  },
  {
    type: 'lycoris',
    pathToSave: configs.lycorisPath,
  },
  {
    type: 'textual-inversion',
    pathToSave: configs.textualInversionPath,
  },
  {
    type: 'vae',
    pathToSave: configs.vaePath,
  },
]

const weightTypeTypedAsTuple = weightTypes.map((t) => z.literal(t.type)) as [
  ZodLiteral<WeightType>,
  ZodLiteral<WeightType>,
  ...ZodLiteral<WeightType>[]
]

const addWeightProcedure = publicProcedure
  .input(
    z.object({
      downloadUrl: z.string(),
      type: z.union(weightTypeTypedAsTuple),
      filename: z.string(),
    })
  )
  .mutation(async (opts) => {
    const { type, downloadUrl, filename } = opts.input
    const id = randomUUID()

    const cachedQueue = getQueueByFilename(filename)

    if (cachedQueue) {
      return cachedQueue.id
    }

    const { event } = createQueue(id, filename)

    const { pathToSave } = weightTypes.find(
      (t) => t.type === type
    ) as WeightTypeStruct

    const weightStream = createStreamForWeight(downloadUrl)
    event.on('close', () => weightStream.end())

    const interval = setInterval(() => {
      if (weightStream.downloadProgress.total !== 0) {
        event.emit('update-progress', weightStream.downloadProgress.percent)
      }
    }, 1000)

    weightStream.on('end', () => {
      clearInterval(interval)
      event.emit('update-progress', 1)
    })

    pipeline(weightStream, createWriteStream(`${pathToSave}/${filename}`))

    return id
  })

const onAddWeight = publicProcedure
  .input(z.object({ id: z.string() }))
  .subscription(({ input }) => {
    const { id } = input
    const { event } = getQueue(id)

    return observable<Progress['percent']>((emit) => {
      const handler = (per: Progress['percent']) => {
        emit.next(per)
      }

      event.on('update-progress', handler)

      return () => {
        event.off('update-progress', handler)
      }
    })
  })

const deleteWeightQueue = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const { id } = input
    const { event } = getQueue(id)

    void event.emit('close')
    void deleteQueue(id)
  })

export const weightsRouter = router({
  addWeight: addWeightProcedure,
  deleteWeightQueue: deleteWeightQueue,
  onAddWeight: onAddWeight,
})

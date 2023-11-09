import type { Progress } from 'got'

import { observable } from '@trpc/server/observable'
import got from 'got'
import { randomUUID } from 'node:crypto'
import { EventEmitter } from 'node:events'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { ZodLiteral, z } from 'zod'

import * as configs from '../../configs/index.js'
import { createQueue as createQueue } from '../../libs/queue.js'
import { publicProcedure, router } from '../../libs/trpc.js'

type WeightType =
  | 'checkpoint'
  | 'lora'
  | 'lycoris'
  | 'textual-inversion'
  | 'vae'

interface QueueMetadata {
  filename: string
  pathToSave: string
  url: string
}

interface QueueProgressMetadata {
  per: Progress['percent']
}

interface WeightTypeStruct {
  pathToSave: string
  type: WeightType
}

const queue = createQueue<QueueMetadata>('DOWNLOAD_WEIGHT')

// @ts-ignore
queue.process((job, done) => {
  const { filename, pathToSave, url } = job.data

  const weightStream = createStreamForWeight(url)

  const interval = setInterval(() => {
    if (weightStream.downloadProgress.total !== 0) {
      const progress: QueueProgressMetadata = {
        per: weightStream.downloadProgress.percent,
      }

      job.reportProgress(progress)
    }
  }, 1000)

  weightStream.on('end', () => {
    clearInterval(interval)
    job.reportProgress({ per: 1 })
    done()
  })

  job.on('failed', () => weightStream.end())
  job.on('close', () => weightStream.end())

  pipeline(weightStream, createWriteStream(`${pathToSave}/${filename}`))
})

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

    const { pathToSave } = weightTypes.find(
      (t) => t.type === type
    ) as WeightTypeStruct

    const job = await queue
      .createJob({
        filename,
        pathToSave,
        url: downloadUrl,
      })
      .setId(randomUUID())
      .save()

    return job.id
  })

const onAddWeight = publicProcedure
  .input(z.object({ id: z.string() }))
  .subscription(async ({ input }) => {
    const job = await queue.getJob(input.id)

    return observable<QueueProgressMetadata['per']>((emit) => {
      const handler = (per: QueueProgressMetadata['per']) => {
        console.log('per:', per)
        emit.next(per)
      }

      job.on('progress', ({ per }: QueueProgressMetadata) => handler(per))

      return () => {
        job.emit('close')
      }
    })
  })

const deleteWeightQueue = publicProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input }) => {
    const { id } = input

    const job = await queue.getJob(id)

    job.emit('close')
    job.remove()
  })

export const weightsRouter = router({
  addWeight: addWeightProcedure,
  deleteWeightQueue: deleteWeightQueue,
  onAddWeight: onAddWeight,
})

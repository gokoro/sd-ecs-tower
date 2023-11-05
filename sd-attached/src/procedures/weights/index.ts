import { observable } from '@trpc/server/observable'
import got from 'got'
import { Progress } from 'got'
import { EventEmitter } from 'node:events'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { ZodLiteral, z } from 'zod'

import * as configs from '../../configs/index.js'
import { publicProcedure, router } from '../../libs/trpc.js'

type WeightType = 'checkpoint' | 'lora' | 'lycoris' | 'textual-inversion'

interface WeightTypeStruct {
  pathToSave: string
  type: WeightType
}

const ee = new EventEmitter()

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

    const weightStream = createStreamForWeight(downloadUrl)

    const interval = setInterval(() => {
      ee.emit('addWeight', weightStream.downloadProgress.percent)
    }, 1000)

    weightStream.on('end', () => clearInterval(interval))

    pipeline(weightStream, createWriteStream(`${pathToSave}/${filename}`))

    return {}
  })

const onAddWeight = publicProcedure.subscription(() =>
  observable<Progress['percent']>((emit) => {
    const handler = (per: Progress['percent']) => {
      emit.next(per)
    }

    ee.on('addWeight', handler)

    return () => {
      ee.off('addWeight', handler)
    }
  })
)

export const weightsRouter = router({
  addWeight: addWeightProcedure,
  onAddWeight: onAddWeight,
})

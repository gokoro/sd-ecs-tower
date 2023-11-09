import type { QueueSettings } from 'bee-queue'

import BeeQueue from 'bee-queue'

import { redisHost, redisPort } from '../configs/index.js'

type QueueSettingWithoutRedis = Omit<QueueSettings, 'redis'>

export const createQueue = <T>(
  name: string,
  setting?: QueueSettingWithoutRedis
) => {
  return new BeeQueue<T>(name, {
    redis: {
      host: redisHost,
      port: redisPort,
    },
    ...setting,
  })
}

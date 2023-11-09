import { createClient } from 'redis'

import {
  redisConnectionString,
  redisHost,
  redisPort,
} from '../configs/index.js'

const createConnectionString = ({
  host,
  port,
}: {
  host: number | string
  port: number | string
}) => redisConnectionString || `redis://${host}:${port}`

export const client = await createClient({
  url: createConnectionString({ host: redisHost, port: redisPort }),
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect()

process.on('exit', () => {
  client.disconnect()
})

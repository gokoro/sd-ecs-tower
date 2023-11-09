import { z } from 'zod'

const env = z.string({
  required_error: "Not every envs aren't set.",
})

const portEnv = z.number().default(4000)
const wsPortEnv = z.number().default(4001)

const redisHostEnv = z.string()
const redisPortEnv = z.number().default(6379)

export const redisHost = redisHostEnv.parse(process.env.REDIS_HOST)
export const redisPort = redisPortEnv.parse(
  parseInt(process.env.REDIS_PORT || '')
)

export const port = portEnv.parse(process.env.PORT)
export const wsPort = wsPortEnv.parse(process.env.WS_PORT)

export const checkpointPath = env.parse(process.env.CHECKPOINT_PATH)
export const loraPath = env.parse(process.env.LORA_PATH)
export const lycorisPath = env.parse(process.env.LYCORIS_PATH)
export const textualInversionPath = env.parse(
  process.env.TEXTUAL_INVENSION_PATH
)
export const vaePath = env.parse(process.env.VAE_PATH)

import { z } from 'zod'

const env = z.string({
  required_error: "Not every envs aren't set.",
})

const portEnv = z.number().default(4000)
const wsPortEnv = z.number().default(4001)

export const port = portEnv.parse(process.env.PORT)
export const wsPort = wsPortEnv.parse(process.env.WS_PORT)

export const checkpointPath = env.parse(process.env.CHECKPOINT_PATH)
export const loraPath = env.parse(process.env.LORA_PATH)
export const lycorisPath = env.parse(process.env.LYCORIS_PATH)
export const textualInversionPath = env.parse(
  process.env.TEXTUAL_INVENSION_PATH
)

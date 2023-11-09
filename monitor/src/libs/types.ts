export const weightTypes = [
  'checkpoint',
  'lora',
  'lycoris',
  'textual-inversion',
  'vae',
] as const

export type WeightTypes = (typeof weightTypes)[number]

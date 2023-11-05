export const weightTypes = [
  'checkpoint',
  'lora',
  'lycoris',
  'textual-inversion',
] as const

export type WeightTypes = (typeof weightTypes)[number]

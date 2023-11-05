import { router } from '../libs/trpc.js'
import { weightsRouter } from './weights/index.js'

export const appRouter = router({
  weights: weightsRouter,
})

export type AppRouter = typeof appRouter

import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type {
  FastifyPluginAsync,
  FastifyPluginOptions,
  RawServerBase,
  RawServerDefault,
} from 'fastify'

export type FastifyPluginAsyncTypebox<
  Options extends FastifyPluginOptions = Record<never, never>,
  Server extends RawServerBase = RawServerDefault
> = FastifyPluginAsync<Options, Server, TypeBoxTypeProvider>

import type { AppRouter } from '@sd-attached/index.js'

import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  splitLink,
  wsLink,
} from '@trpc/client'
import WebSocket from 'ws'

import * as configs from '../configs/index.js'
import { attachedEndpoint } from '../configs/index.js'

globalThis.WebSocket = WebSocket as any

const wsClient = createWSClient({
  url: configs.attachedWsEndpoint,
})

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription'
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        url: attachedEndpoint,
      }),
    }),
  ],
})

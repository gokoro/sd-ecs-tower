import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import { WebSocketServer } from 'ws'

import * as configs from './configs/index.js'
import { appRouter } from './procedures/index.js'

const wss = new WebSocketServer({
  port: configs.wsPort,
  host: '0.0.0.0',
})

const wssHandler = applyWSSHandler({ wss, router: appRouter })

const server = createHTTPServer({
  router: appRouter,
})

server.listen(configs.port)

console.log(
  `SD-Attached server running via tRPC on ${configs.port} and ws on ${configs.wsPort}!`
)

process.on('SIGTERM', () => {
  console.log('SIGTERM')
  wssHandler.broadcastReconnectNotification()
  wss.close()
})

export type { AppRouter } from './procedures/index.js'

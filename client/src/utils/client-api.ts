// client-only

import ky from 'ky'

export const towerEndpoint = process.env.NEXT_PUBLIC_TOWER_ENDPOINT

export const towerServer = ky.create({
  prefixUrl: towerEndpoint,
})

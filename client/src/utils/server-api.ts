import ky from 'ky'

const towerEndpoint = process.env.SERVER_SIDE_TOWER_ENDPOINT
console.log('SERVER_SIDE_TOWER_ENDPOINT:', towerEndpoint)

export const serverTowerApi = ky.create({ prefixUrl: towerEndpoint, fetch })

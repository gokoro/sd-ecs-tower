import ky from 'ky'

const towerEndpoint = process.env.SERVER_SIDE_TOWER_ENDPOINT

export const serverTowerApi = ky.create({ prefixUrl: towerEndpoint, fetch })

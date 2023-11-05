import got from 'got'

const civitaiV1 = got.extend({ prefixUrl: 'https://civitai.com/api/v1/' })
const hf = got.extend()

// https://github.com/civitai/civitai/wiki/REST-API-Reference#get-apiv1models
export interface CivitaiModelByIdResponse {
  modelVersions: CivitaiModelByIdResponseModelVersion[]
  name: string
  type: string
}

export interface CivitaiModelByIdResponseModelVersion {
  files: CivitaiModelByIdResponseModelVersionFile[]
  id: number
  name: string
}

export interface CivitaiModelByIdResponseModelVersionFile {
  downloadUrl: string
  id: number
  name: string
  sizeKB: number
}

export const civitai = {
  async getModelById(id: string) {
    const res = await civitaiV1
      .get(`models/${id}`)
      .json<CivitaiModelByIdResponse>()
    return res
  },
}

export const huggingface = {
  async getModelByUrl(url: string) {
    const { headers } = await got.head(url)

    const contentDisposition = headers['content-disposition']
    const contentLength = headers['content-length']

    return { contentDisposition, contentLength }
  },
}

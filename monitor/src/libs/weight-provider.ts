import got from 'got'

const civitaiV1 = got.extend({ prefixUrl: 'https://civitai.com/api/v1/' })

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

export const getFileHeaders = async (url: string) => {
  const { headers } = await got.head(url)

  const contentDisposition = headers['content-disposition']
  const contentLength = headers['content-length']

  return { contentDisposition, contentLength }
}

export const parseFileName = (str: string) => {
  const matched = str?.match(/filename="([^"]+)"/)

  return matched ? matched[1] : null
}

export const parseFileSize = (len: number | string): number => {
  return typeof len === 'number' ? len : parseInt(len) / (1024 * 1024 * 1024)
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
  getModelByUrl(url: string) {
    return getFileHeaders(url)
  },
}

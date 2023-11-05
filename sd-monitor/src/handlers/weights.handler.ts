import type { WeightTypes } from '../libs/types.js'
import type { WeightResponseSuccessType } from '../routes/weights/schema.js'

import { AppError } from '../libs/error.js'
import { civitai, huggingface } from '../libs/weight-provider.js'

interface WeightsHandlerInput {
  type: WeightTypes
  weightUrl: string
}

type ModelInterface = {
  getCivitai: (id: string) => Promise<void>
  getHuggingFace: (id: string) => Promise<void>
}

enum WeightProvider {
  civitai = 'CIVITAI',
  huggingface = 'HUGGINGFACE',
}

const classifyWeightProvider = (url: string) => {
  if (url.includes('civitai.com')) {
    return WeightProvider.civitai
  }

  if (url.includes('huggingface.co')) {
    return WeightProvider.huggingface
  }
}

export const weightsHandler = async (
  input: WeightsHandlerInput
): Promise<WeightResponseSuccessType> => {
  const assumedProvider = classifyWeightProvider(input.weightUrl)

  if (!assumedProvider) {
    throw new AppError(400, "Requested provider isn't available.")
  }

  const model = new Model()

  if (assumedProvider === WeightProvider.civitai) {
    const matched = input.weightUrl.match(/\/models\/(\d+)/)

    if (!matched)
      throw new AppError(
        400,
        "ID of the model isn't included in the provided url."
      )

    const [, id] = matched

    await model.getCivitai(id)
  }

  if (assumedProvider === WeightProvider.huggingface) {
    const resolveRegex =
      /https:\/\/huggingface\.co\/([^\/]+)\/([^\/]+)\/resolve\//g

    const resolveUrl = resolveRegex.test(input.weightUrl)
      ? input.weightUrl
      : input.weightUrl.replace('blob', 'resolve')

    await model.getHuggingFace(resolveUrl)
  }

  return model.data
}

class Model implements ModelInterface {
  private _data?: WeightResponseSuccessType

  async getCivitai(id: string) {
    const { name, modelVersions, type } = await civitai.getModelById(id)

    this._data = {
      name,
      versions: modelVersions.map((v) => ({
        name: v.name,
        downloadUrl: v.files[0].downloadUrl,
        filename: v.files[0].name,
        size: v.files[0].sizeKB / (1024 * 1024 * 1024),
        versionId: v.id,
      })),
    }
  }

  async getHuggingFace(url: string) {
    const { contentDisposition, contentLength } =
      await huggingface.getModelByUrl(url)

    const matched = contentDisposition?.match(/filename="([^"]+)"/)

    if (!matched) {
      throw new AppError(
        400,
        "Any downloadable resource isn't found from the requested url."
      )
    }

    let [, filename] = matched

    const filesize = contentLength
      ? parseInt(contentLength) / (1024 * 1024 * 1024)
      : 0

    this._data = {
      name: filename,
      versions: [
        {
          downloadUrl: url,
          filename,
          size: filesize,
          name: filename,
          versionId: -1,
        },
      ],
    }
  }

  get data() {
    if (!this._data) {
      throw new Error(
        "Either getCivitai or getHuggingFace haven't been called."
      )
    }

    return this._data
  }
}

import type { WeightTypes } from '../libs/types.js'
import type {
  ProviderWeightGetQueryType,
  ProviderWeightGetResponseSuccessType,
} from '../routes/providers/schema.js'

import { AppError } from '../libs/error.js'
import * as provider from '../libs/weight-provider.js'

interface WeightsHandlerInput {
  context: string
  provider: ProviderWeightGetQueryType['provider']
}

type ModelInterface = {
  getCivitai: (id: string) => Promise<void>
  getCustom: (url: string) => Promise<void>
  getHuggingFace: (url: string) => Promise<void>
}

export const providersHandler = async (
  input: WeightsHandlerInput
): Promise<ProviderWeightGetResponseSuccessType> => {
  const { provider, context } = input
  const model = new Model()

  if (provider === 'civitai') {
    const matched = context.match(/\/models\/(\d+)/)

    if (!matched)
      throw new AppError(
        400,
        "ID of the model isn't included in the provided url."
      )

    const [, id] = matched

    await model.getCivitai(id)
  }

  if (provider === 'huggingface') {
    const resolveRegex =
      /https:\/\/huggingface\.co\/([^\/]+)\/([^\/]+)\/resolve\//g

    const resolveUrl = resolveRegex.test(context)
      ? context
      : context.replace('blob', 'resolve')

    await model.getHuggingFace(resolveUrl)
  }

  if (provider === 'custom') {
    await model.getCustom(context)
  }

  return model.data
}

class Model implements ModelInterface {
  private _data?: ProviderWeightGetResponseSuccessType

  async getCivitai(id: string) {
    const { name, modelVersions } = await provider.civitai.getModelById(id)

    this._data = {
      name,
      versions: modelVersions.map((v) => ({
        name: v.name,
        downloadUrl: v.files[0].downloadUrl,
        filename: v.files[0].name,
        size: v.files[0].sizeKB / (1024 * 1024),
        versionId: v.id,
      })),
    }
  }

  async getCustom(url: string) {
    const { contentDisposition, contentLength } = await provider.getFileHeaders(
      url
    )

    const filename =
      provider.parseFileName(contentDisposition ?? '') ?? 'default'

    const filesize = provider.parseFileSize(contentLength ?? 0)

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

  async getHuggingFace(url: string) {
    const { contentDisposition, contentLength } =
      await provider.huggingface.getModelByUrl(url)

    const filename =
      provider.parseFileName(contentDisposition ?? '') ?? 'default'

    const filesize = provider.parseFileSize(contentLength ?? 0)

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

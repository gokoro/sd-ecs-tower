import { Static, Type } from '@sinclair/typebox'

import { weightTypes } from '../../libs/types.js'

export const ProviderWeightGetQuery = Type.Object({
  context: Type.String(),
  provider: Type.Union([
    Type.Literal('civitai'),
    Type.Literal('huggingface'),
    Type.Literal('custom'),
  ]),
})

export const ProviderWeightGetResponse = Type.Object({
  name: Type.String(),
  versions: Type.Array(
    Type.Object({
      versionId: Type.Number(),
      name: Type.String(),
      filename: Type.String(),
      size: Type.Number(),
      downloadUrl: Type.String(),
    })
  ),
})

export const ProviderWeightGetResponseSuccess = Type.Object({
  name: Type.String(),
  versions: Type.Array(
    Type.Object({
      versionId: Type.Number(),
      name: Type.String(),
      filename: Type.String(),
      size: Type.Number(),
      downloadUrl: Type.String(),
    })
  ),
})

export type ProviderWeightGetQueryType = Static<typeof ProviderWeightGetQuery>
export type ProviderWeightGetResponseType = Static<
  typeof ProviderWeightGetResponse
>
export type ProviderWeightGetResponseSuccessType = Static<
  typeof ProviderWeightGetResponseSuccess
>

import { Static, Type } from '@sinclair/typebox'

import { weightTypes } from '../../libs/types.js'

export const WeightPostRequest = Type.Object({
  type: Type.Union(weightTypes.map((t) => Type.Literal(t))),
  url: Type.String(),
  filename: Type.String(),
})

export const WeightPostResponseSuccess = Type.Object({
  id: Type.String(),
})

export const WeightGetResponse = Type.Array(
  Type.Object({
    id: Type.String(),
    filename: Type.String(),
    type: Type.String(),
    downloadUrl: Type.String(),
  })
)

export const WeightDeleteRequest = Type.Object({
  id: Type.String(),
})

export const WeightDeleteResponseSuccess = Type.Object({
  status: Type.Boolean(),
})

export const WeightIdParam = Type.Object({
  id: Type.String(),
})

export const WeightProgressDeleteResponseSuccess = Type.Object({
  status: Type.Boolean(),
})

export type WeightPostRequestType = Static<typeof WeightPostRequest>
export type WeightPostResponseSuccessType = Static<
  typeof WeightPostResponseSuccess
>
export type WeightGetResponseType = Static<typeof WeightGetResponse>

export type WeightDeleteRequestType = Static<typeof WeightDeleteRequest>
export type WeightDeleteResponseSuccessType = Static<
  typeof WeightDeleteResponseSuccess
>

export type WeightIdParamType = Static<typeof WeightIdParam>

export type WeightProgressDeleteResponseSuccessType = Static<
  typeof WeightProgressDeleteResponseSuccess
>

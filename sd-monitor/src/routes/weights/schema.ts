import { Static, Type } from '@sinclair/typebox'

export const WeightRequest = Type.Object({
  weightUrl: Type.Required(Type.String()),
})

export const WeightResponseSuccess = Type.Object({
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

export const WeightApplyRequest = Type.Object({
  downloadUrl: Type.Required(Type.String()),
})

export type WeightRequestType = Static<typeof WeightRequest>
export type WeightApplyRequestType = Static<typeof WeightApplyRequest>

export type WeightResponseSuccessType = Static<typeof WeightResponseSuccess>

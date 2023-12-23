import { serverTowerApi } from '@/utils/server-api'
import { WeightCard, AddCard } from './card'
import {
  ContainerStyle,
  WeightCardContainerStyle,
  WeightName,
} from './page.css'
import { weightTypes } from '../utils/types'

type WeightGetResponse = {
  type: string
  filename: string
  id: string
  downloadUrl: string
}[]

export default async function Home() {
  const weights = await serverTowerApi.get('weights').json<WeightGetResponse>()
  const types = weightTypes.toSorted((b, f) => {
    const bb = weights.find((t) => t.type === b.value)
    const ff = weights.find((t) => t.type === f.value)

    if (bb && ff) {
      const bi = weightTypes.findIndex((w) => w.value === b.value)
      const fi = weightTypes.findIndex((w) => w.value === f.value)

      return bi - fi
    }

    return bb ? -1 : 1
  })

  return (
    <div className={ContainerStyle}>
      {types.map(({ name, value }) => (
        <div key={value} className={WeightCardContainerStyle}>
          <div className={WeightName}>{name}</div>
          {weights
            .filter((w) => w.type === value)
            .map(({ id, filename }) => (
              <WeightCard key={id} type={name} filename={filename} />
            ))}
          <AddCard type={value} />
        </div>
      ))}
    </div>
  )
}

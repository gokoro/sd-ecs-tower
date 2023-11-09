import { serverTowerApi } from '@/utils/server-api'
import { WeightCard } from './card'
import { ContainerStyle, WeightCardContainerStyle } from './page.css'
import { weightTypes } from '../utils/types'
import { Code } from '@radix-ui/themes'

type WeightGetResponse = {
  type: string
  filename: string
  id: string
  downloadUrl: string
}[]

export default async function Home() {
  const weights = await serverTowerApi.get('weights/').json<WeightGetResponse>()
  const types = weightTypes.filter((w) =>
    weights.find((t) => t.type === w.value)
  )

  return (
    <div className={ContainerStyle}>
      {types.map(({ value, name }) => (
        <div key={value} className={WeightCardContainerStyle}>
          <div>
            <Code color="iris">{name}</Code>
          </div>
          {weights
            .filter((w) => w.type === value)
            .map(({ id, filename }) => (
              <WeightCard key={id} type={name} filename={filename} />
            ))}
        </div>
      ))}
    </div>
  )
}

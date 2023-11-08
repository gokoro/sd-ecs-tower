import * as Progress from '@radix-ui/react-progress'
import { IndicatorStyle, RootStyle } from './progress.css'

interface BarProps {
  progress: number
}

export const Bar = ({ progress }: BarProps) => {
  return (
    <Progress.Root className={RootStyle} value={progress}>
      <Progress.Indicator
        className={IndicatorStyle}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}

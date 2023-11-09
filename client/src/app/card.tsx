import {
  CardDescription,
  CardDivider,
  CardStyle,
  CardTitleContainer,
  CardTitleText,
} from './card.css'

interface CardProps {
  filename: string
  type: string
}

export const WeightCard = (props: CardProps) => {
  return (
    <div className={CardStyle}>
      <div className={CardTitleContainer}>
        <div className={CardTitleText}>{props.filename}</div>
      </div>
      <div className={CardDivider}></div>
      <div className={CardDescription}>
        <div>{props.type}</div>
      </div>
    </div>
  )
}

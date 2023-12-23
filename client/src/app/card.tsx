'use client'

import { BsTrash3 as TrashIcon } from 'react-icons/bs'
import { GoStack as StackIcon } from 'react-icons/go'

import {
  WeightCardDescription,
  WeightCardDivider,
  WeightCardHover,
  WeightCardHoverIcon,
  WeightCardHoverIconContainer,
  WeightCardStatusCircle,
  WeightCardStatusCircleType,
  WeightCardStyle,
  WeightCardContainer,
  WeightCardTitleText,
  WeightCardLabelContainer,
  WeightCardLabel,
} from './card.css'

import { AddCardContainer } from './card.css'
import { useMainModalStore } from '@/states/modal'

import type { MainModalState } from '@/states/modal'

interface WeightCardProps {
  filename: string
  type: string
}

interface AddCardProps {
  type: MainModalState['type']
}

export const WeightCard = (props: WeightCardProps) => {
  return (
    <div>
      <div className={WeightCardStyle}>
        <div className={WeightCardContainer}>
          <div className={WeightCardTitleText}>{props.filename}</div>
          <div className={WeightCardDescription}>
            <div>{props.type}</div>
          </div>
          {/* <div
          className={`${CardStatusCircle} ${CardStatusCircleType.downloading}`}
        /> */}
        </div>

        {/* <div className={CardHover}>
        <motion.div className={CardHoverIconContainer}>
          <TrashIcon className={CardHoverIcon} />
        </motion.div>
      </div> */}
        {/* <div className={CardDivider}></div> */}
      </div>
    </div>
  )
}

export const AddCard = ({ type }: AddCardProps) => {
  const { setModalOpen, setType } = useMainModalStore()

  const handleClick = () => {
    setModalOpen()
    setType(type)
  }

  return (
    <div onClick={handleClick} className={AddCardContainer}>
      +
    </div>
  )
}

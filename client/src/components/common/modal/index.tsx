'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import {
  ModalDescriptionStyle,
  ModalTitleStyle,
  ModalContentContainerStyle,
} from './modal.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  isOpen?: boolean
  setIsOpen?: (state: boolean) => void
}

export const Modal = ({
  title,
  description,
  isOpen: isOpenAsProp,
  setIsOpen: setIsOpenAsProp,
  children,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] =
    typeof isOpenAsProp === 'boolean' && setIsOpenAsProp
      ? [isOpenAsProp, setIsOpenAsProp]
      : useState(true)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content {...props}>
        <div className={ModalTitleStyle}>{title}</div>
        <div className={ModalDescriptionStyle}>{description}</div>
        <div className={ModalContentContainerStyle}>{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export const DialogClose = Dialog.Close

import { vars } from '@/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const ModalTitleStyle = style({
  fontWeight: 'bold',
  fontSize: '1.4rem',
  marginBottom: '4px',
})

export const ModalDescriptionStyle = style({
  fontSize: '.9rem',
  color: vars.colors.gray11,
})

export const ModalContentContainerStyle = style({
  marginTop: '1em',
})

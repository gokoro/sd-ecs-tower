import { vars } from '@/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const InputLabelContainerStyle = style({
  marginBottom: '6px',
})

export const InputLabelStyle = style({
  fontWeight: '500',
  fontSize: '0.9rem',
  lineHeight: '100%',
})

export const InputLabelDescriptionStyle = style({
  color: vars.colors.gray11,
  fontSize: '0.75rem',
})

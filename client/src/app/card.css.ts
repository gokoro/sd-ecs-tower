import { vars } from '@/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const CardStyle = style({
  border: `1px solid ${vars.colors.gray6}`,
  borderRadius: '5px',
})

export const CardTitleContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0.8em',
  height: '100px',
})

export const CardTitleText = style({
  fontSize: '0.9rem',
  fontWeight: 500,
})

export const CardDivider = style({
  borderTop: `1px solid ${vars.colors.gray6}`,
})

export const CardDescription = style({
  color: vars.colors.gray11,
  margin: '0 0.8em',
  padding: '0.5em 0',
  fontSize: '0.8rem',
})

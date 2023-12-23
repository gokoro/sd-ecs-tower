import { style } from '@vanilla-extract/css'
import { vars } from '@/styles/theme.css'

export const HeaderStyle = style({
  zIndex: '5',
  position: 'fixed',
  width: '100%',
  top: 0,
  left: 0,
  padding: '0 1em',
  borderBottom: `1px solid ${vars.colors.gray6}`,
  backgroundColor: '#fcfcfc87',
  backdropFilter: 'blur(10px)',
})

export const ContainerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '16px auto',
  maxWidth: 900,
  height: '60px',
})

export const ContainerHead = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

export const ContainerHeadTitle = style({
  fontSize: '0.9rem',
  color: vars.colors.gray11,
})
export const ContainerHeadSubTitle = style({
  lineHeight: '120%',
  fontSize: '1.2rem',
  fontWeight: '500',
})

export const ContainerSide = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

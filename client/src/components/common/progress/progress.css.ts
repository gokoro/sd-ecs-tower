import { vars } from '@/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const RootStyle = style({
  position: 'relative',
  overflow: 'hidden',
  background: vars.colors.gray3,
  borderRadius: '99999px',
  width: '100%',
  height: '12px',
  transform: 'translateZ(0)', // Fix for Safari clipping issue
})

export const IndicatorStyle = style({
  background: vars.colors.iris9,

  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
})

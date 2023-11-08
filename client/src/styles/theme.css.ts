import { globalStyle, createGlobalTheme } from '@vanilla-extract/css'
import { gray, iris } from '@radix-ui/colors'

export const vars = createGlobalTheme(':root', {
  colors: {
    ...gray,
    ...iris,
  },
})

globalStyle('html, body', {
  color: vars.colors.gray12,
  backgroundColor: vars.colors.gray1,
  fontFamily: 'var(--font-inter)',
})

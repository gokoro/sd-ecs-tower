import { globalStyle, createGlobalTheme } from '@vanilla-extract/css'
import { gray, iris, tomato } from '@radix-ui/colors'

export const vars = createGlobalTheme(':root', {
  colors: {
    ...gray,
    ...iris,
    ...tomato,
  },
})

globalStyle('html, body', {
  color: vars.colors.gray12,
  backgroundColor: vars.colors.gray2,
  fontFamily: 'var(--font-inter)',
})

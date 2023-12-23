import { style } from '@vanilla-extract/css'

const Flex = style({
  display: 'flex',
})

export const ContainerStyle = style([
  Flex,
  {
    '@media': {
      '(max-width: 576px)': {
        flexDirection: 'column',
      },
    },
    flexDirection: 'row',

    gap: '2em',
  },
])

export const WeightCardContainerStyle = style([
  Flex,
  {
    '@media': {
      '(max-width: 576px)': {
        width: '100%',
        minWidth: 'initial',
      },
    },
    flexDirection: 'column',
    gap: '1em',
    width: 280,
    minWidth: 280,
    flex: 0,
  },
])

export const WeightName = style({
  fontWeight: '700',
})

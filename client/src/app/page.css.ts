import { style } from '@vanilla-extract/css'

const Flex = style({
  display: 'flex',
})

export const ContainerStyle = style([
  Flex,
  {
    gap: '2em',
  },
])

export const WeightCardContainerStyle = style([
  Flex,
  {
    flexDirection: 'column',
    gap: '1em',
    width: 250,
    minWidth: 250,
    flex: 0,
  },
])

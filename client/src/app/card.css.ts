import { vars } from '@/styles/theme.css'
import { createVar, style, styleVariants } from '@vanilla-extract/css'

export const WeightCardStyle = style({
  backgroundColor: vars.colors.gray1,
  borderRadius: '16px',
  flexDirection: 'column',
  boxShadow: 'var(--shadow-3)',
  position: 'relative',
})

export const WeightCardContainer = style({
  padding: '1.2em',
})

export const WeightCardTitleText = style({
  fontSize: '0.9rem',
  fontWeight: 500,
  marginBottom: '2px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const WeightCardDescription = style({
  display: 'flex',
  gap: '8px',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: vars.colors.gray11,
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  fontWeight: '500',
  letterSpacing: '0.5px',
  marginBottom: '8px',
})

export const WeightCardDivider = style({
  // borderTop: `1px solid ${vars.colors.gray6}`,
  padding: '0 1em',
  paddingBottom: '1em',
})

export const WeightCardStatusCircleSize = createVar()

export const WeightCardStatusCircleType = styleVariants({
  notExisting: {
    backgroundColor: vars.colors.tomato9,
    boxShadow: `0px 0px 8px 3px ${vars.colors.tomato5}`,
  },
  downloading: {
    backgroundColor: '#FFC53D',
    boxShadow: `0px 0px 8px 3px #FBE577`,
  },
  ready: {
    backgroundColor: '#46A758',
  },
})

export const WeightCardStatusCircle = style({
  vars: {
    [WeightCardStatusCircleSize]: '.4rem',
  },

  width: WeightCardStatusCircleSize,
  height: WeightCardStatusCircleSize,
  borderRadius: '50%',
})

export const WeightCardHover = style({
  position: 'absolute',
  top: 0,
  right: 0,
  borderRadius: '5px',
  background: `linear-gradient(to left, rgba(255, 255, 255, 0.5), ${vars.colors.tomato3} 50%, rgba(255, 255, 255, 0.5))`,
  width: '100%',
  height: '100%',
  transition:
    'opacity 0.1s linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%)',
  opacity: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(8px)',

  selectors: {
    [`${WeightCardStyle}:hover &`]: {
      opacity: 1,
    },
  },
})

export const WeightCardHoverIconContainer = style({
  maxWidth: '70px',
  width: '50%',
  height: '50%',
  marginRight: '1em',
  color: vars.colors.tomato9,
})

export const WeightCardHoverIcon = style({
  maxWidth: '70px',
  width: '50%',
  height: '50%',
  marginRight: '1em',
  color: vars.colors.tomato9,
})

export const WeightCardLabelContainer = style({
  padding: '4px 8px',
  width: 'fit-content',
  maxWidth: '50%',
  backgroundColor: vars.colors.tomato5,
  marginBottom: '0.5em',
  borderRadius: '8px',
})
export const WeightCardLabel = style({
  fontSize: '.8rem',
  color: vars.colors.tomato11,
  fontWeight: '500',
})

export const AddCardContainer = style([
  WeightCardContainer,
  {
    borderRadius: 16,
    border: `3px dashed ${vars.colors.gray4}`,
    textAlign: 'center',
    fontWeight: '500',
    color: vars.colors.gray8,
    lineHeight: '200%',
    cursor: 'pointer',
    transition: '0.1s',

    ':hover': {
      borderColor: vars.colors.gray5,
      background: vars.colors.gray3,
      color: vars.colors.gray9,
    },
  },
])

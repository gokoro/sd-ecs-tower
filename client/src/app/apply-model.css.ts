import { vars } from '@/styles/theme.css'
import { style } from '@vanilla-extract/css'

export const ButtonContainerStyle = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '1.4em',
  gap: 8,
})

export const InjectedWeightTypeSelectStyle = style({
  justifyContent: 'space-between',
})

export const VersionSelectContainerStyle = style({
  marginTop: '1em',
  maxHeight: '400px',
})

const FlexCenterAligned = style({
  display: 'flex',
  alignItems: 'center',
})

export const VersionSelectBoxStyle = style([
  FlexCenterAligned,
  {
    display: 'flex',
    gap: '10px',
    padding: '0.6em 0.2em',
    cursor: 'pointer',
    marginRight: '16px',
    justifyContent: 'space-between',
  },
])

export const VersionSelectBoxLeftStyle = style([
  FlexCenterAligned,
  {
    flex: '0',
  },
])

export const VersionSelectBoxRightStyle = style([
  FlexCenterAligned,
  {
    flex: '1',
    justifyContent: 'space-between',
    gap: '8px',
  },
])

export const VersionSelectBoxTitleStyle = style({})

export const VersionSelectBoxDescriptionStyle = style({
  color: vars.colors.gray11,
  fontSize: '0.8rem',
  display: 'flex',
  alignItems: 'center',
})

export const DownloadContainerStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})
export const DownloadDescriptionStyle = style({
  fontSize: '.9rem',
  color: vars.colors.gray11,
})

export const ProgressContainerStyle = style([
  FlexCenterAligned,
  {
    gap: 14,
  },
])

export const ProgressSideStyle = style({
  fontSize: '.8rem',
  fontWeight: 700,
  textAlign: 'center',
  width: 50,
})
export const ProgressSectionStyle = style({})

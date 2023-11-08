import type { ReactNode } from 'react'
import {
  BodyContainerStyle,
  ContentContainerStyle,
  TermContainerStyle,
} from './container.css'

export const Body = ({ children }: { children: ReactNode }) => {
  return <div className={BodyContainerStyle}>{children}</div>
}

export const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div className={TermContainerStyle}>
      <div className={ContentContainerStyle}>{children}</div>
    </div>
  )
}

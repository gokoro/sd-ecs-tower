import {
  HeaderStyle,
  ContainerStyle,
  ContainerHead,
  ContainerHeadTitle,
  ContainerHeadSubTitle,
  ContainerSide,
} from './header.css'

import { ModalButton } from '@/app/apply-modal'

export const Header = () => {
  return (
    <header className={HeaderStyle}>
      <div className={ContainerStyle}>
        <div className={ContainerHead}>
          <div className={ContainerHeadTitle}>Stable Diffusion WebUI</div>
          <div className={ContainerHeadSubTitle}>Tower</div>
        </div>
        <div className={ContainerSide}>
          <ModalButton>+ Add</ModalButton>
        </div>
      </div>
    </header>
  )
}

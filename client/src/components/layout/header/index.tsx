import {
  HeaderStyle,
  ContainerStyle,
  ContainerHead,
  ContainerHeadTitle,
  ContainerHeadSubTitle,
  ContainerSide,
} from './header.css'

export const Header = () => {
  return (
    <header className={HeaderStyle}>
      <div className={ContainerStyle}>
        <div className={ContainerHead}>
          <div className={ContainerHeadTitle}>Stable Diffusion WebUI</div>
          <div className={ContainerHeadSubTitle}>Tower</div>
        </div>
      </div>
    </header>
  )
}

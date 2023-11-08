import {
  InputLabelContainerStyle,
  InputLabelDescriptionStyle,
  InputLabelStyle,
} from './label.css'

interface InputLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  description?: string
  htmlFor: string
}

export const InputLabel = ({
  htmlFor,
  text,
  description,
  className,
  children,
  ...props
}: InputLabelProps) => {
  return (
    <div className={`${InputLabelContainerStyle} ${className}`} {...props}>
      <label htmlFor={htmlFor} className={InputLabelStyle}>
        {text}
      </label>
      {description && (
        <div className={InputLabelDescriptionStyle}>{description}</div>
      )}
    </div>
  )
}

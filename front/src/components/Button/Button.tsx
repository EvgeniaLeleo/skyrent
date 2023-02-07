import { FC, ReactNode } from 'react'
import cn from 'classnames'

import style from './style.module.css'

type Props = {
  children: string | ReactNode
  onClick?: VoidFunction
  buttonStatus?: 'normal' | 'disabled'
  type?: 'button' | 'submit'
  mb?: string
}

export const Button: FC<Props> = ({
  buttonStatus = 'normal',
  children,
  onClick,
  type,
  mb,
}) => {
  const buttonClassName = cn(style.button, style[`${buttonStatus}`])

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={buttonStatus === 'disabled'}
      style={{ marginBottom: mb }}
      type={type}
    >
      {children}
    </button>
  )
}

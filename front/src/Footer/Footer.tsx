import { Link } from 'react-router-dom'
import cn from 'classnames'

import { ROUTES } from '../routes'

import style from './style.module.css'
import logoBig from './assets/logoBig.svg'

export const Footer = () => {
  return (
    <>
      <Link to={ROUTES.main}>
        <img
          className={cn(style.logo, style.logoBottom)}
          src={logoBig}
          alt="skyrent-logo"
          height="29px"
        />
      </Link>
      <p className={style.year}>2023</p>
    </>
  )
}

// TODO .logo не требуется?

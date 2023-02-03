import { Link, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../routes'

import style from './style.module.css'
import logo from './assets/logo.svg'
import backButton from './assets/back.svg'

export const NavBack = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <nav className={style.nav}>
      <img
        className={style.backButton}
        src={backButton}
        alt="back"
        onClick={handleBack}
      />
      <Link to={ROUTES.main}>
        <img
          className={style.logo}
          src={logo}
          alt="skyrent-logo"
          height="27px"
        />
      </Link>
    </nav>
  )
}

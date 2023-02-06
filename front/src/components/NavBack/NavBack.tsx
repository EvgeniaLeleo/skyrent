import { Link, useNavigate } from 'react-router-dom'

import { ROUTES } from '../../routes'

import style from './style.module.css'
import logo from './../../assets/logoBig.svg'
import backButton from './../../assets/back.svg'

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
        width="21px"
        onClick={handleBack}
      />
      <Link to={ROUTES.main} className={style.navLinkLogo}>
        <img
          className={style.logo}
          src={logo}
          alt="skyrent-logo"
          height="29px"
        />
      </Link>
    </nav>
  )
}

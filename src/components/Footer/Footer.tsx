import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../routes'

import style from './style.module.css'
import logoBig from './../../assets/logoBig.svg'

export const Footer = () => {
  const navigate = useNavigate()

  const handleMain = () => {
    window.scrollTo(0, 0)
    navigate(ROUTES.main)
  }

  return (
    <>
      <img
        onClick={handleMain}
        className={style.logoBottom}
        src={logoBig}
        alt="skyrent-logo"
        height="29px"
      />
      <p className={style.year}>2023</p>
    </>
  )
}

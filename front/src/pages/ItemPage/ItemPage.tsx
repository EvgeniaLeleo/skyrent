import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { ItemImage } from '../../components/ItemImage/ItemImage'
import { Footer } from '../../Footer/Footer'

import style from './style.module.css'
import logo from './assets/logo.svg'
import backButton from './assets/back.svg'
import data from './../../data.json'

export const ItemPage = () => {
  const itemPk = Number(useParams()?.pk)
  const navigate = useNavigate()
  const item = data.find((item) => item.pk === itemPk)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!item) {
    return <PageWrapper>А нет такого места</PageWrapper>
  }

  const { country, city, description, price } = item

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <PageWrapper>
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

      <h3 className={style.location}>
        {country} → {city}
      </h3>
      <p className={style.price}>$ {price} / month</p>
      <p className={style.description}>{description}</p>
      <ItemImage item={item} />

      <Footer />
    </PageWrapper>
  )
}

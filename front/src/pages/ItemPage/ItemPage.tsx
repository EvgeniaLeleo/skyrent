import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { PageWrapper } from '../PageWrapper/PageWrapper'
import { ItemImage } from '../../components/ItemImage/ItemImage'
import { Footer } from '../../components/Footer/Footer'
import { Button } from '../../components/Button/Button'
import { NavBack } from '../../components/NavBack/NavBack'
import { ItemContacts } from '../../components/ItemContacts/ItemContacts'

import style from './style.module.css'
import on from './../../assets/on.svg'
import off from './../../assets/off.svg'
import data from './../../data.json'

export const ItemPage = () => {
  const itemPk = Number(useParams()?.pk)
  const item = data.find((item) => item.pk === itemPk)
  const { pathname } = useLocation()
  const [contactsVisible, setContactsVisible] = useState<boolean>(false)

  const handleContactsToggle = () => {
    setContactsVisible((prev) => !prev)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!item) {
    return (
      <PageWrapper>
        <NavBack />
        <p className={style.message}>Такой локации еще нет!</p>
      </PageWrapper>
    )
  }

  const { country, city, description, price } = item

  return (
    <PageWrapper>
      <NavBack />

      <h3 className={style.location}>
        {country} → {city}
      </h3>
      <p className={style.price}>$ {price} / month</p>
      <p className={style.description}>{description}</p>

      <ItemImage item={item} mb="40px" />

      <h4 className={style.featuresTitle}>Что есть внутри?</h4>

      <ul className={style.featuresOnList}>
        {item.features_on.split(', ').map((item, index) => (
          <li className={style.featureOnItem} key={index + item}>
            <img src={on} alt="" className={style.featureIcon} width="17px" />
            {item}
          </li>
        ))}
        {item.features_off.split(', ').map((item, index) => (
          <li className={style.featureOffItem} key={index + item}>
            <img src={off} alt="" className={style.featureIcon} width="17px" />
            {item}
          </li>
        ))}
      </ul>

      {!contactsVisible && (
        <Button onClick={handleContactsToggle} mb="30px">
          Показать контактную информацию
        </Button>
      )}

      {contactsVisible && <ItemContacts item={item} />}

      <Footer />
    </PageWrapper>
  )
}

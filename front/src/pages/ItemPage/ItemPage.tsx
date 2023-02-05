import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { PageWrapper } from '../PageWrapper/PageWrapper'
import { ItemImage } from '../../components/ItemImage/ItemImage'
import { Footer } from '../../components/Footer/Footer'
import { Button } from '../../components/Button/Button'
import { NavBack } from '../../components/NavBack/NavBack'
import { ItemContacts } from '../../components/ItemContacts/ItemContacts'
import { URL_API } from '../../constants'
import { Item } from '../../types'

import style from './style.module.css'
import on from './../../assets/on.svg'
import off from './../../assets/off.svg'

export const ItemPage = () => {
  const itemPk = useParams()?.pk || ''

  const { isLoading, isError, data } = useQuery<Item>(itemPk, () =>
    fetch(`${URL_API}/${itemPk}`).then((response) => response.json())
  )

  const { pathname } = useLocation()
  const [contactsVisible, setContactsVisible] = useState<boolean>(false)
  const [showMore, setShowMore] = useState<boolean>(false)
  const [item, setItem] = useState<Item>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (data) {
      setItem(data)
      return
    }
  }, [data])

  if (isLoading) {
    return (
      <PageWrapper>
        <NavBack />
        <p className={style.message}>Загрузка данных...</p>
      </PageWrapper>
    )
  }

  if (isError) {
    return (
      <PageWrapper>
        <NavBack />
        <p className={style.message}>
          Не удалось загрузить данные: возможно, такой локации еще нет
        </p>
      </PageWrapper>
    )
  }

  if (!item) {
    return (
      <PageWrapper>
        <NavBack />
        <p className={style.message}>Такой локации еще нет!</p>
      </PageWrapper>
    )
  }

  const { country, city, description, price } = item

  const handleDescriptionToggle = () => {
    setShowMore((prev) => !prev)
  }

  const handleContactsToggle = () => {
    setContactsVisible((prev) => !prev)
  }

  return (
    <PageWrapper>
      <NavBack />

      <h3 className={style.location}>
        {country} → {city}
      </h3>
      <p className={style.price}>$ {price} / month</p>
      <p className={showMore ? style.description : style.descriptionHidden}>
        {description}
        {!showMore && (
          <span className={style.showMore} onClick={handleDescriptionToggle}>
            <span className={style.ellipsis}>... </span>
            <span className={style.showMoreText}>more</span>
          </span>
        )}
      </p>

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
        <Button onClick={handleContactsToggle} mb="57px">
          Показать контактную информацию
        </Button>
      )}

      {contactsVisible && <ItemContacts item={item} />}

      <Footer />
    </PageWrapper>
  )
}

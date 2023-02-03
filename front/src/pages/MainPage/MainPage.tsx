import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { ItemCard } from '../../components/ItemCard/ItemCard'
import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { Footer } from '../../components/Footer/Footer'
import { Filter } from '../../components/Filter/Filter'

import data from './../../data.json'
import style from './style.module.css'

export const MainPage = () => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false)

  const handleFilterToggle = () => {
    setFilterVisible((prev) => !prev)
  }

  return (
    <PageWrapper>
      <nav className={style.nav}>
        <Link to={ROUTES.main}>
          <img
            src="./assets/images/logo.svg"
            alt="skyrent-logo"
            height="27px"
          />
        </Link>
        <Link to={ROUTES.main} className={style.navLink}>
          <div>О проекте</div>
        </Link>
      </nav>
      <h1 className={style.title}>Пора переезжать?</h1>
      <h2 className={style.subtitle}>
        Находите места для жизни и работы по всему миру
      </h2>

      {!filterVisible && (
        <Button onClick={handleFilterToggle} mb="41px">
          Подобрать недвижимость
        </Button>
      )}

      {filterVisible && <Filter />}

      {data.map((item) => (
        <Link
          to={`${ROUTES.item}/${item.pk}`}
          key={item.pk}
          className={style.cardLink}
        >
          <ItemCard item={item} />
        </Link>
      ))}

      <Footer />
    </PageWrapper>
  )
}

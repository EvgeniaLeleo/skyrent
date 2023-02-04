import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Button } from '../../components/Button/Button'
import { ItemCard } from '../../components/ItemCard/ItemCard'
import { ROUTES } from '../../routes'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { Footer } from '../../components/Footer/Footer'
import { Filter } from '../../components/Filter/Filter'
import { Item } from '../../types'
import { URL_API } from '../../constants'

// import dataLocal from './../../data.json'
import style from './style.module.css'
import logo from './../../assets/logo.svg'

export const MainPage = () => {
  const { isLoading, isError, data } = useQuery<Item[]>('itemsData', () =>
    fetch(URL_API).then((response) => response.json())
  )

  const [items, setItems] = useState<Item[]>([])
  const [filterVisible, setFilterVisible] = useState<boolean>(false)

  const handleFilterToggle = () => {
    setFilterVisible((prev) => !prev)
  }

  useEffect(() => {
    if (data?.length) {
      setItems(data)
      return
    }
  }, [data])

  return (
    <PageWrapper>
      <nav className={style.nav}>
        <Link to={ROUTES.main}>
          <img src={logo} alt="skyrent-logo" height="27px" />
        </Link>
        <Link to={ROUTES.about} className={style.navLink}>
          <div>О проекте</div>
        </Link>
      </nav>
      <h1 className={style.title}>Пора переезжать?</h1>
      <h2 className={style.subtitle}>
        Находите места для жизни и работы по всему миру
      </h2>

      {!filterVisible && (
        <Button
          onClick={handleFilterToggle}
          mb="41px"
          buttonStatus={isLoading || isError ? 'disabled' : 'normal'}
        >
          Подобрать недвижимость
        </Button>
      )}

      {filterVisible && <Filter data={data} />}

      {isLoading && <p>Загрузка данных...</p>}

      {isError && <p>Произошла ошибка, не удалось загрузить данные!</p>}

      {items.map((item) => (
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

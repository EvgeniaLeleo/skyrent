import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Button } from '../../components/Button/Button'
import { ItemCard } from '../../components/ItemCard/ItemCard'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { Footer } from '../../components/Footer/Footer'
import { Filter } from '../../components/Filter/Filter'
import { ArrowUp } from '../../components/ArrowUp/ArrowUp'
import { ROUTES } from '../../routes'
import { Item } from '../../types'
import { URL_API } from '../../constants'

import style from './style.module.css'
import logo from './../../assets/logo.svg'

export const MainPage = () => {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [arrowVisible, setArrowVisible] = useState<boolean>(false)
  const [filterVisible, setFilterVisible] = useState<boolean>(false)

  const { isLoading, isError, data } = useQuery<Item[]>('itemsData', () =>
    fetch(URL_API).then((response) => response.json())
  )

  useEffect(() => {
    window.onscroll = function () {
      window.scrollY > 550 ? setArrowVisible(true) : setArrowVisible(false)
    }
  }, [])

  useEffect(() => {
    isLoading ? setLoading(true) : setLoading(false)
    isError ? setError(true) : setError(false)
  }, [isLoading, isError])

  useEffect(() => {
    if (data?.length) {
      setItems(data)
      return
    }
  }, [data])

  const handleFilterToggle = () => {
    setFilterVisible((prev) => !prev)
  }

  return (
    <PageWrapper>
      <div className={style.contentWrapper}>
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
            buttonStatus={loading || error ? 'disabled' : 'normal'}
          >
            Подобрать недвижимость
          </Button>
        )}

        {filterVisible && (
          <Filter
            data={data}
            setItems={setItems}
            setError={setError}
            setLoading={setLoading}
          />
        )}

        {loading && <p className={style.message}>Загрузка данных...</p>}

        {!loading && error && (
          <p className={style.message}>
            Произошла ошибка, не удалось загрузить данные!
          </p>
        )}

        {!loading && !error && !items.length && (
          <p className={style.message}>Не нашлось подходящих локаций</p>
        )}

        {!loading &&
          !error &&
          !!items.length &&
          items.map((item) => (
            <Link
              to={`${ROUTES.item}/${item.pk}`}
              key={item.pk}
              className={style.cardLink}
            >
              <ItemCard item={item} />
            </Link>
          ))}

        <div className={style.emptyDiv}></div>
        {arrowVisible && <ArrowUp />}

        <Footer />
      </div>
    </PageWrapper>
  )
}

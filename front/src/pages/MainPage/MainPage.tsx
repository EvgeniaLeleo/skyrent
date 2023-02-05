import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

import { Button } from '../../components/Button/Button'
import { ItemCard } from '../../components/ItemCard/ItemCard'
import { Footer } from '../../components/Footer/Footer'
import { Filter } from '../../components/Filter/Filter'
import { ArrowUp } from '../../components/ArrowUp/ArrowUp'
import { PageWrapper } from '../PageWrapper/PageWrapper'
import { ROUTES } from '../../routes'
import { Item } from '../../types'
import { URL_API } from '../../constants'

import style from './style.module.css'
import logo from './../../assets/logo.svg'

export const MainPage = () => {
  const sessionLocation = sessionStorage.getItem('location')
  const sessionMinPrice = sessionStorage.getItem('minPrice')
  const sessionMaxPrice = sessionStorage.getItem('maxPrice')

  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [arrowVisible, setArrowVisible] = useState<boolean>(false)
  const [filterVisible, setFilterVisible] = useState<boolean>(
    !!(sessionLocation || sessionMaxPrice || sessionMinPrice)
  )

  // This query is necessary to load data for the filter drop menu
  const { isLoading, isError, data } = useQuery<Item[]>('itemsData', () =>
    fetch(URL_API).then((response) => response.json())
  )

  const {
    data: filteredData,
    isLoading: isLoadingFiltered,
    isError: isErrorFiltered,
    refetch: refetchFiltered,
    isFetching: isFetchingFiltered,
  } = useQuery<Item[]>(
    `filteredItemsData${sessionLocation}Min${sessionMinPrice}Max${sessionMaxPrice}`,
    async () => {
      return fetch(
        `${URL_API}?${new URLSearchParams({
          city: sessionLocation?.split(' → ')[1] || '',
          from: sessionMinPrice || '',
          to: sessionMaxPrice || '',
        })}`
      ).then((response) => response.json())
    },
    { enabled: false }
  )

  useEffect(() => {
    if (sessionLocation || sessionMaxPrice || sessionMinPrice) {
      refetchFiltered()
      if (filteredData?.length) {
        setItems(filteredData)
        return
      }
    }

    if (data?.length) {
      setItems(data)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredData])

  useEffect(() => {
    isLoading || isLoadingFiltered || isFetchingFiltered
      ? setLoading(true)
      : setLoading(false)
    isError || isErrorFiltered ? setError(true) : setError(false)
  }, [
    isLoading,
    isLoadingFiltered,
    isFetchingFiltered,
    isError,
    isErrorFiltered,
  ])

  useEffect(() => {
    window.onscroll = function () {
      window.scrollY > 650 ? setArrowVisible(true) : setArrowVisible(false)
    }
  }, [])

  const handleFilterToggle = () => {
    setFilterVisible((prev) => !prev)
  }

  const filterProps = {
    data,
    setItems,
    setError,
    setLoading,
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

        {filterVisible && <Filter {...filterProps} />}

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

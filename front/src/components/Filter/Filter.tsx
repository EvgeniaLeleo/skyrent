import { FC, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { Button } from '../Button/Button'
import { sortLocations } from '../../utils/sortLocations'
import { URL_API } from '../../constants'
import { Item } from '../../types'

import style from './style.module.css'
import arrowDown from './../../assets/arrowDown.svg'

type Props = {
  data?: Item[]
  setItems: Function
  setLoading: Function
  setError: Function
}

export const Filter: FC<Props> = ({ data, setItems, setError, setLoading }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')

  const uniqueLocations = data?.length ? [...new Set(sortLocations(data))] : []

  const handleContactsToggle = () => {
    setMenuVisible((prev) => !prev)
  }

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location)
    setMenuVisible((prev) => !prev)
  }

  const handleMinPriceChange = (e: { target: { value: string } }) => {
    if (/^\d*$/.test(e.target.value))
      setMinPrice(Number(e.target.value).toString())
  }

  const handleMaxPriceChange = (e: { target: { value: string } }) => {
    if (/^\d*$/.test(e.target.value))
      setMaxPrice(Number(e.target.value).toString())
  }

  const handleSearch = (e: { preventDefault: () => void }) => {
    refetch()
    e.preventDefault()
  }

  const {
    data: filteredData,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<Item[]>(
    'filteredItemsData',
    async () => {
      const city = selectedLocation.split(' → ')[1] || ''

      return fetch(
        `${URL_API}?${new URLSearchParams({
          city: city,
          from: minPrice,
          to: maxPrice,
        })}`
      ).then((response) => response.json())
    },
    { enabled: false }
  )

  useEffect(() => {
    if (filteredData) {
      filteredData.length ? setItems(filteredData) : setItems([])
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData])

  useEffect(() => {
    isLoading || isFetching ? setLoading(true) : setLoading(false)
    isError ? setError(true) : setError(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError, isFetching])

  return (
    <div className={style.formWrapper}>
      <form onSubmit={handleSearch} className={style.filterForm}>
        <button
          className={style.select}
          onClick={handleContactsToggle}
          type="button"
        >
          <span>{selectedLocation || 'Страна и город'}</span>
          <img
            src={arrowDown}
            alt="Show list"
            className={menuVisible ? style.selectClose : ''}
          />
        </button>

        <div className={style.inputsWrapper}>
          <input
            onChange={handleMinPriceChange}
            value={minPrice}
            className={style.filterInput}
            placeholder="Цена от"
          />
          <input
            onChange={handleMaxPriceChange}
            value={maxPrice}
            className={style.filterInput}
            placeholder="Цена до"
          />
        </div>

        <Button
          type="submit"
          buttonStatus={isLoading || isFetching ? 'disabled' : 'normal'}
        >
          {isLoading || isFetching ? 'Выполняем поиск ...' : 'Подобрать'}
        </Button>
      </form>

      {menuVisible && (
        <div className={style.dropDown}>
          {uniqueLocations.length === 0 && (
            <div className={style.dropDownItem}>
              <span className={style.dropDownItemText}>
                Пока нет предложений...
              </span>
            </div>
          )}
          {uniqueLocations?.map((location, index) => {
            return (
              <div
                onClick={() => handleSelectLocation(location)}
                className={style.dropDownItem}
                key={location + index}
              >
                <span className={style.dropDownItemText}>{location}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

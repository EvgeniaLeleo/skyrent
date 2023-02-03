import { useState } from 'react'

import { Button } from '../Button/Button'
import { sortLocations } from '../../utils/sortLocations'

import style from './style.module.css'
import arrowDown from './assets/arrowDown.svg'
import data from './../../data.json'

const uniqueLocations = [...new Set(sortLocations(data))]

export const Filter = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const handleContactsToggle = () => {
    setMenuVisible((prev) => !prev)
  }

  const handleSelectLocation = (location: string) => {
    setSelectedLocation(location)
    setMenuVisible((prev) => !prev)
    window.scrollTo(0, 250)
  }

  const handleMinPriceChange = (e: { target: { value: string } }) => {
    if (/^\d*$/.test(e.target.value)) setMinPrice(e.target.value)
  }

  const handleMaxPriceChange = (e: { target: { value: string } }) => {
    if (/^\d*$/.test(e.target.value)) setMaxPrice(e.target.value)
  }

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

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

        <Button onClick={() => {}} type="submit">
          Подобрать
        </Button>
      </form>

      {menuVisible && (
        <div className={style.dropDown}>
          {uniqueLocations.map((location, index) => {
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

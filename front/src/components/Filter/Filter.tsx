import { FC } from 'react'

import { Button } from '../Button/Button'

import style from './style.module.css'
import arrowDown from './assets/arrowDown.svg'
import data from './../../data.json'

type Props = {}

export const Filter: FC<Props> = () => {
  return (
    <form className={style.filterForm}>
      <button className={style.select} type="button">
        <span>Страна и город</span>
        <img src={arrowDown} alt="Show list" />
      </button>
      <div className={style.inputsWrapper}>
        <input className={style.filterInput} placeholder="Цена от"></input>
        <input className={style.filterInput} placeholder="Цена до"></input>
      </div>
      <Button onClick={() => {}} type="submit">
        Подобрать
      </Button>
    </form>
  )
}

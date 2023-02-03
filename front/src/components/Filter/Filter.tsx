import { FC } from 'react'

import style from './style.module.css'
import data from './../../data.json'
import { Button } from '../Button/Button'

type Props = {}

export const Filter: FC<Props> = () => {
  return (
    <form className={style.filterForm}>
      <button className={style.select} type="button">
        Страна и город
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

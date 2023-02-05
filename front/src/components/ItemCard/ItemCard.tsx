import { FC } from 'react'

import { Item } from '../../types'
import { ItemImage } from '../ItemImage/ItemImage'

import style from './style.module.css'

type Props = {
  item: Item
}

export const ItemCard: FC<Props> = ({ item }) => {
  const { country, city, description, price } = item

  return (
    <div className={style.itemCard}>
      <ItemImage item={item} mb="30px" />

      <div>
        <h3 className={style.location}>
          {country} → {city}
        </h3>

        <span className={style.description}>{description}</span>
        <p className={style.price}>$ {price} / month</p>
      </div>
    </div>
  )
}

import { FC } from 'react'

import { Item } from '../../types'

import style from './style.module.css'
import { ItemImage } from '../ItemImage/ItemImage'

type Props = {
  item: Item
}

export const ItemCard: FC<Props> = ({ item }) => {
  const { country, city, description, price } = item

  return (
    <div className={style.itemCard}>
      <ItemImage item={item} />

      <div>
        <h3 className={style.location}>
          {country} → {city}
        </h3>

        <p className={style.description}>{description}</p>
        <p className={style.price}>$ {price} / month</p>
      </div>
    </div>
  )
}

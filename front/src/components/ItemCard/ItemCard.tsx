import { FC, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

import { Item } from '../../types'

import style from './style.module.css'

type Props = {
  item: Item
}

export const ItemCard: FC<Props> = ({ item }) => {
  const { picture_url, title, country, city, description, price } = item
  const [loading, setLoading] = useState<boolean>(true)

  const handleLoad = () => setLoading(false)

  return (
    <div className={style.itemCard}>
      <div className={style.imgWrapper}>
        {!picture_url && <p>Фото отсутствует</p>}

        {picture_url && loading && (
          <div className={style.progressWrapper}>
            <CircularProgress color="inherit" className={style.progress} />
          </div>
        )}

        {picture_url && (
          <img
            className={style.img}
            width="100%"
            height="100%"
            src={picture_url}
            alt={title}
            onLoad={handleLoad}
          />
        )}
      </div>

      <h3 className={style.location}>
        {country} → {city}
      </h3>

      <p className={style.description}>{description}</p>
      <p className={style.price}>$ {price} / month</p>
    </div>
  )
}

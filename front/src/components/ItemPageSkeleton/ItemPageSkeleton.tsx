import Skeleton from '@mui/material/Skeleton/Skeleton'
import { NUMBER_OF_LIST_SKELETONS } from '../../constants'

import style from './style.module.css'

export const ItemPageSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rounded" className={style.location} />
      <Skeleton variant="rounded" className={style.price} />
      <Skeleton variant="rounded" height={77} className={style.description} />
      <Skeleton variant="rounded" height="auto" className={style.img} />
      <Skeleton variant="rounded" className={style.featuresTitle} />

      <ul className={style.featuresOnList}>
        {[...Array(NUMBER_OF_LIST_SKELETONS).keys()].map((item, index) => (
          <li className={style.featureOnItem} key={index + item}>
            <Skeleton variant="rounded" height={26} />
          </li>
        ))}
      </ul>

      <Skeleton variant="rounded" height={50} className={style.button} />
    </div>
  )
}

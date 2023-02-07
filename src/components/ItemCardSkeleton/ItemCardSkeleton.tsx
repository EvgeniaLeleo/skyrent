import { Skeleton } from '@mui/material'

import style from './style.module.css'

export const ItemCardSkeleton = () => {
  return <Skeleton variant="rounded" height={555} className={style.itemCard} />
}

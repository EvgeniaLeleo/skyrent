import { FC, ReactNode } from 'react'

import style from './style.module.css'

type Props = {
  children: ReactNode
}

export const PageWrapper: FC<Props> = ({ children }) => {
  return <div className={style.pageWrapper}>{children}</div>
}

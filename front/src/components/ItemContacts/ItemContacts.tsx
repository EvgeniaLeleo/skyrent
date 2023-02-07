import { FC } from 'react'

import { Item } from '../../types'

import style from './style.module.css'

type Props = {
  item: Item
}

export const ItemContacts: FC<Props> = ({ item }) => {
  const { host_name, host_phone, host_location } = item

  return (
    <div className={style.contactsWrapper}>
      <div>
        <p className={style.contactsTitle}>Имя хоста</p>
        <p className={style.contactsDetails}>{host_name}</p>
      </div>

      <div>
        <p className={style.contactsTitle}>Телефон</p>
        <p className={style.contactsDetails}>{host_phone}</p>
      </div>

      <div>
        <p className={style.contactsTitle}>Адрес</p>
        <p className={style.contactsDetails}> {host_location}</p>
      </div>
    </div>
  )
}

import { Item } from '../types'

export const sortLocations = (data: Item[]) => {
  return [...data]
    .sort((a, b) => {
      if (
        a.country < b.country ||
        (a.country === b.country && a.city < b.city)
      ) {
        return -1
      }
      if (
        a.country > b.country ||
        (a.country === b.country && a.city > b.city)
      ) {
        return 1
      }

      return 0
    })
    .map((el) => el.country + ' → ' + el.city)
}

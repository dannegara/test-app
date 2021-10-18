import { ITEMS_PER_PAGE } from '../constants/pagination'

export const paginate = <T> (data: T[], currentPage: number): T[] => {
  const begin = Number(currentPage) * ITEMS_PER_PAGE
  const end = begin + ITEMS_PER_PAGE

  return data.slice(begin, end)
}

import { DB } from '../pages/api/types/db'

export const fetchItems = async (): Promise<DB> => {
  const res = await fetch('http://localhost:3000/api')

  return res.json()
}

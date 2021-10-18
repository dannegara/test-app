// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import db from './db/miista-export.json'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(db)
}

import db from '../db/miista-export.json'

export type Edge = typeof db.data.allContentfulProductPage.edges[number]
export type DB = typeof db

import { DB, Edge } from "../pages/api/types/db";

interface Acc {
  [key: string]: boolean
}

export const extractCategoriesFromData = (data: DB) => Object.keys(data.data.allContentfulProductPage.edges.reduce((acc: Acc, edge: Edge) => {
  edge.node.categoryTags?.forEach((category) => {
    acc[category.trim()] = true
  })

  return acc
}, {} as Acc))

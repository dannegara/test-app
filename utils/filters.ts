import { Edge } from '../pages/api/types/db'
import { Tag } from '../components/Tags'

const searchByColor = (edge: Edge, searchingColor: string) =>
  edge.node.colorFamily?.some((color) => color.name.toLowerCase().includes(searchingColor.toLowerCase()))

const searchByPrice = (edge: Edge, price_from?: number, price_to?: number) =>
  edge.node.shopifyProductEu.variants.edges.some(variantEdge => {
    const isHigherThanPriceFrom = price_from ? Number(variantEdge.node.price) >= price_from : true
    const isLowerThanPriceTo = price_to ? Number(variantEdge.node.price) <= price_to : true

    return isHigherThanPriceFrom && isLowerThanPriceTo
  })

const searchByCategory = (edge: Edge, categories: Tag[]) => 
  categories.every(category =>
    edge.node.categoryTags?.some((categoryTag) => categoryTag.toLowerCase() === category.text.toLowerCase())
  )

export const filterByInputs = (
  edges: Edge[],
  categories: Tag[],
  priceFrom: string,
  priceTo: string,
  color: string
) => edges.reduce((acc, edge) => {
    const colorMatched = color ? searchByColor(edge, color) : true
    const isInPriceRange = priceFrom || priceTo ? searchByPrice(edge, Number(priceFrom), Number(priceTo)) : true
    const categoriesMatched = categories?.length > 0 ? searchByCategory(edge, categories) : true

    if (colorMatched && isInPriceRange && categoriesMatched) {
      acc.push(edge)
    }

    return acc
  }, [] as Edge[])

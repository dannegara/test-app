import { useState, useMemo, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import inputStyles from '../styles/Input.module.css'
import { Edge } from './api/types/db'
import Tags, { Tag } from '../components/Tags'
import Pagination from '../components/Pagination'
import Item from '../components/Item'
import { ITEMS_PER_PAGE } from '../constants/pagination'
import { paginate } from '../utils/pagination'
import { filterByInputs } from '../utils/filters'
import { extractCategoriesFromData } from '../utils/category'
import { fetchItems } from '../services/api'

interface Props {
  data: Edge[]
  categoryTags: string[]
}

const Home: NextPage<Props> = ({ data, categoryTags }) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [color, setColor] = useState('')
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')

  const filteredItems = useMemo(() =>
    filterByInputs(data, tags, priceFrom, priceTo, color),
    [
      tags,
      priceFrom,
      priceTo,
      color
    ]
  )
  const paginatedItems = useMemo(() => paginate(filteredItems, currentPage), [filteredItems, currentPage])
  const pageCount = useMemo(() => Math.ceil(filteredItems.length / ITEMS_PER_PAGE), [filteredItems])

  // Whenever we input something we set the current page to the first one
  useEffect(() => setCurrentPage(0), [color, priceFrom, priceTo, tags])

  const handleDeleteTag = (i: number) => setTags(tags.filter((_, index) => index !== i))
  const handleTagAddition = (tag: Tag) => setTags([...tags, tag])

  const onPageChange = ({ selected }: { selected: number }) => {
    window.scroll({ top: 0, behavior: 'smooth' })
    setCurrentPage(selected)
  }

  const hasItems = paginatedItems.length > 0;

  return (
    <div>
      <Head>
        <title>Test App</title>
        <meta name="description" content="Test app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.inputs}>
          <input
            type='text'
            placeholder='Color'
            value={color}
            className={inputStyles.input}
            onChange={(event) => setColor(event.target.value)}
          />
          <input
            type='number'
            placeholder='Price from'
            value={priceFrom}
            className={inputStyles.input}
            onChange={(event) => setPriceFrom(event.target.value)}
          />
          <input
            type='number'
            placeholder='Price to'
            value={priceTo}
            className={inputStyles.input}
            onChange={(event) => setPriceTo(event.target.value)}
          />
          <Tags
            tags={tags}
            handleDelete={handleDeleteTag}
            handleAddition={handleTagAddition}
            suggestions={categoryTags}
          />
        </div>
        <div className={styles.grid}>
          {hasItems && paginatedItems.map((edge) => <Item key={edge.node.name} edge={edge} />)}
          {!hasItems && <p>No items found</p>}
        </div>
        {hasItems && (
          <Pagination
            pageCount={pageCount}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
        )}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetchItems()

  return {
    props: {
      data: data.data.allContentfulProductPage.edges,
      categoryTags: extractCategoriesFromData(data)
    }
  }
}

export default Home

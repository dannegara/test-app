import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.css'

interface Props {
  pageCount: number
  onPageChange: (args: { selected: number }) => void
  currentPage: number
}

const Pagination: React.FC<Props> = ({ pageCount, onPageChange, currentPage }) => (
  <ReactPaginate
    containerClassName={styles.container}
    pageClassName={styles.item}
    activeClassName={styles.active}
    pageLinkClassName={styles.link}
    pageRangeDisplayed={10}
    pageCount={pageCount}
    initialPage={0}
    marginPagesDisplayed={1}
    disableInitialCallback
    onPageChange={onPageChange}
    nextClassName={styles.buttons}
    previousClassName={styles.buttons}
    forcePage={currentPage}
  />
)

export default Pagination

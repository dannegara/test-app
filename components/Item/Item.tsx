import styles from '../../styles/Home.module.css'
import { Edge } from '../../pages/api/types/db'

interface Props { edge: Edge }

const Item: React.FC<Props> = ({ edge }) => {
  return (
    <div className={styles.card}>
      <h2>{edge.node.name}</h2>
      <p><b>Colors: </b>{edge.node.colorFamily?.map((color) => color.name).join(', ')}</p>
      <p><b>Price: </b>{edge.node.shopifyProductEu.variants.edges[0].node.price}</p>
      <p><b>Categories: </b>{edge.node.categoryTags?.join(', ')}</p>
    </div>
  )
}

export default Item

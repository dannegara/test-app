import { WithContext as ReactTags } from 'react-tag-input'
import { KEY_CODES } from '../../constants/tags'
import inputStyles from '../../styles/Input.module.css'
import tagsStyles from './Tags.module.css'

export interface Tag {
  id: string
  text: string
}

interface Props {
  handleDelete: (index: number) => void
  handleAddition: (tag: Tag) => void
  tags: Tag[]
  suggestions: string[]
}

const delimiters = [...KEY_CODES.enter, KEY_CODES.comma]

const Tags: React.FC<Props> = ({ tags, handleDelete, handleAddition, suggestions }) => (
  <ReactTags
    placeholder='Insert categories'
    tags={tags}
    handleDelete={handleDelete}
    handleAddition={handleAddition}
    delimiters={delimiters}
    allowDragDrop={false}
    suggestions={suggestions.map((suggestion) => ({ id: suggestion, text: suggestion }))}
    classNames={{
      tagInputField: inputStyles.input,
      suggestions: tagsStyles.suggestions,
      remove: tagsStyles.remove
    }}
  />
)

export default Tags

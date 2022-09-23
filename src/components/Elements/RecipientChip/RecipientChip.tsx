/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import StyledChip from './RecipientChipStyles'

interface IRecipientChip {
  option: any
  getTagProps: any
  handleDelete: (data: any) => void
  index: number
}

const RecipientChip = ({
  option,
  getTagProps,
  handleDelete,
  index,
}: IRecipientChip) => {
  const [showFull, setShowFull] = useState(false)

  const chipLabel = () => {
    if (option.name && showFull) {
      return `${option.name} <${option.emailAddress}>`
    }
    if (option.name && !showFull) {
      return option.name
    }

    return option.emailAddress
  }

  return (
    <StyledChip
      variant="filled"
      label={chipLabel()}
      {...getTagProps({ index })}
      onDelete={() => handleDelete(option)}
      onClick={() => setShowFull(!showFull)}
      title={option.emailAddress}
    />
  )
}

export default RecipientChip

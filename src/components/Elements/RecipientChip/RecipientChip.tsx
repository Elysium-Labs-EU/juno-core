/* eslint-disable react/jsx-props-no-spreading */
import type { AutocompleteRenderGetTagProps } from '@mui/material'
import { useState } from 'react'

import type { TContact } from 'store/storeTypes/contactsTypes'

import StyledChip from './RecipientChipStyles'

interface IRecipientChip {
  option: TContact
  getTagProps?: AutocompleteRenderGetTagProps
  handleDelete: (data: any) => void
  index: number
}

const chipLabel = ({
  option,
  showFull,
}: {
  option: TContact
  showFull: boolean
}) => {
  if (option.name && showFull) {
    return `${option.name} <${option.emailAddress}>`
  }
  if (option.name && !showFull) {
    return option.name
  }

  return option.emailAddress
}

const RecipientChip = ({
  option,
  getTagProps = undefined,
  handleDelete,
  index,
}: IRecipientChip) => {
  const [showFull, setShowFull] = useState(false)

  const additionalProps = getTagProps ? getTagProps({ index }) : {}

  return (
    <StyledChip
      variant="filled"
      label={chipLabel({ option, showFull })}
      {...additionalProps}
      onDelete={() => handleDelete(option)}
      onClick={() => setShowFull(!showFull)}
      title={option.emailAddress}
    />
  )
}

export default RecipientChip

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import StyledChip from './RecipientChipStyles'

interface IRecipientChip {
    option: any
    getTagProps: any
    handleDelete: Function
    id: string
    index: number
}


const RecipientChip = (props: IRecipientChip) => {
    const { option, getTagProps, handleDelete, id, index } = props

    return <StyledChip variant="filled" label={option} {...getTagProps({ index })} onDelete={() => handleDelete({ option, fieldId: id })} />
}

export default RecipientChip
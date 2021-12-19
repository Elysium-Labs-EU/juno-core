/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'
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
    const [showFull, setShowFull] = useState(false)

    const chipLabel = () => {
        if (option.name && showFull) {
            return `${ option.name } <${ option.emailAddress }>`
        }
        if (option.name && !showFull) {
            return option.name
        }

        return option.emailAddress
    }

    return <StyledChip variant="filled" label={chipLabel()} {...getTagProps({ index })} onDelete={() => handleDelete({ option, fieldId: id })} onClick={() => setShowFull(!showFull)} title={option.emailAddress} />
}

export default RecipientChip
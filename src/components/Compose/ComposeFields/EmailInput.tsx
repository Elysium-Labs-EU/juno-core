/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import StyledTextField from './EmailInputStyles'
import RecipientChip from '../../Elements/RecipientChip/RecipientChip'

interface IEmailInputProps {
    id: string
    valueState: string[]
    availableOptions: any
    handleChange: any
    handleDelete: Function
    inputValue: string
    setInputValue: Function
    willAutoFocus: boolean
}

const emailInput = (props: IEmailInputProps) => {
    const {
        id,
        valueState,
        availableOptions,
        handleChange,
        inputValue,
        setInputValue,
        handleDelete,
        willAutoFocus
    } = props

    return (
        <Autocomplete
            multiple
            size="small"
            id={id}
            value={valueState ?? []}
            options={availableOptions.map((option: any) => option.title)}
            freeSolo
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    <RecipientChip option={option} getTagProps={getTagProps} handleDelete={handleDelete} index={index} id={id} />
                ))
            }
            renderInput={(params) => (
                <StyledTextField
                    {...params}
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus={willAutoFocus}
                />
            )}
        />
    )
}

export default emailInput
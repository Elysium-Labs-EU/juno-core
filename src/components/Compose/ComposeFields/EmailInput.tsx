/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import StyledTextField from './EmailInputStyles'
import RecipientChip from '../../Elements/RecipientChip/RecipientChip'
import { Contact } from '../../../Store/contactsTypes'
import { useAppSelector } from '../../../Store/hooks'
import { selectAllContacts } from '../../../Store/contactsSlice'

interface IEmailInputProps {
  id: string
  valueState: Contact[]
  availableOptions: any
  handleChange: any
  handleDelete: Function
  inputValue: string
  setInputValue: Function
  willAutoFocus: boolean
}


const emailInput = (props: IEmailInputProps) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<readonly Contact[]>([])
  const availableContacts: Contact[] = useAppSelector(selectAllContacts)

  const loading = open && options.length === 0
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

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {
      if (availableContacts.some((contact) => valueState.map((item) => item.emailAddress === contact.emailAddress))) {
        console.log('exists')
      }
      // await  // For demo purposes.

      if (active) {
        setOptions([{ name: 'Robbert Tuerlings', emailAddress: 'robberttg@gmail.com' }])
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      multiple
      size="small"
      id={id}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      value={valueState ?? []}
      isOptionEqualToValue={(option, value) => option.emailAddress === value.emailAddress}
      getOptionLabel={(option) => `${ option.name } <${ option.emailAddress }>`}
      options={options}
      freeSolo
      onChange={(event: any, newValue: any) => handleChange({ newValue, fieldId: id })}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderTags={(value: readonly Contact[], getTagProps) =>
        value.map((option: Contact, index: number) => (
          <RecipientChip key={option.emailAddress} option={option} getTagProps={getTagProps} handleDelete={handleDelete} index={index} id={id} />
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
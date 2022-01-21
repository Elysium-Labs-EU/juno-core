/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import StyledTextField from './EmailInputStyles'
import RecipientChip from '../../../Elements/RecipientChip/RecipientChip'
import { Contact } from '../../../../Store/contactsTypes'
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks'
import { selectAllContacts, selectContactsLoaded, setAllContacts, setContactsLoaded } from '../../../../Store/contactsSlice'
import contactApi from '../../../../data/contactApi'
import { setServiceUnavailable } from '../../../../Store/utilsSlice'
import useDebounce from '../../../../Hooks/useDebounce'

interface IEmailInputProps {
  id: string
  valueState: Contact[]
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
    handleChange,
    inputValue,
    setInputValue,
    handleDelete,
    willAutoFocus
  } = props
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<readonly Contact[]>([])
  const debouncedInputValue = useDebounce(inputValue, 500)
  const availableContacts: Contact[] = useAppSelector(selectAllContacts)
  const contactsLoaded: string = useAppSelector(selectContactsLoaded)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true
    if (debouncedInputValue && debouncedInputValue.length > 1) {

      (async () => {
        const check = availableContacts.some((contact) => contact.emailAddress.includes(inputValue.toLowerCase()))
        if (!check) {
          const params = {
            query: inputValue,
            readMask: 'emailAddresses,names'
          }
          try {
            const responseQueryContacts = await contactApi().queryContacts(params)
            if (responseQueryContacts.status === 200) {
              const {
                data: { results },
              } = responseQueryContacts

              const mappedResults = results && results.length > 0 ? results.map(
                (contact: any): Contact => ({
                  name: Object.prototype.hasOwnProperty.call(
                    contact.person,
                    'names'
                  )
                    ? contact.person.names[0].displayName
                    : contact.person.emailAddresses[0].value,
                  emailAddress: contact.person.emailAddresses[0].value,
                })
              ) : []

              dispatch(setAllContacts(mappedResults))
              dispatch(setContactsLoaded(JSON.stringify(Date.now())))
            }
          } catch (err) {
            console.log(err)
            dispatch(setServiceUnavailable('Error fetching contacts.'))
          }
        }

        if (mounted) {
          setOptions(availableContacts)
        }
      })()

    }
    return () => {
      mounted = false
    }
  }, [debouncedInputValue, contactsLoaded])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      multiple
      limitTags={3}
      id={id}
      open={open}
      filterSelectedOptions
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
          fullWidth
          autoFocus={willAutoFocus}
        />
      )}
    />
  )
}

export default emailInput

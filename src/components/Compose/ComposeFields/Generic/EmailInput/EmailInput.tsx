/* eslint-disable react/jsx-props-no-spreading */
import Autocomplete from '@mui/material/Autocomplete'
import { matchSorter } from 'match-sorter'
import { useCallback, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { IRecipientsList } from 'components/Compose/ComposeEmailTypes'
import RecipientChip from 'components/Elements/RecipientChip/RecipientChip'
import StyledCircularProgress from 'components/Elements/StyledCircularProgress'
import contactApi from 'data/contactApi'
import useDebounce from 'hooks/useDebounce'
import {
  selectAllContacts,
  selectContactsLoaded,
  setAllContacts,
  setContactsLoaded,
} from 'store/contactsSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import type { AppDispatch } from 'store/store'
import type { IContact } from 'store/storeTypes/contactsTypes'
import { setSystemStatusUpdate } from 'store/utilsSlice'
import emailValidation from 'utils/emailValidation'

import StyledTextField from './EmailInputStyles'

export interface IEmailInputProps {
  handleChange: (recipientListRaw: IRecipientsList) => void
  handleDelete: (value: any) => void
  id: string
  inputValue: string
  registerOnKeyDown: () => void
  setInputValue: Dispatch<SetStateAction<string>>
  valueState: Array<IContact>
  willAutoFocus: boolean
}

interface IHandleIncompleteInput {
  id: string
  inputValue: string
}

interface IFetchContacts {
  inputValue: string
  dispatch: AppDispatch
  setCompletedSearch: Dispatch<SetStateAction<boolean>>
}

// TODO: Check contactsSlice to unduplicate the code.
const fetchContacts = async ({
  inputValue,
  dispatch,
  setCompletedSearch,
}: IFetchContacts) => {
  const params = {
    query: inputValue,
    readMask: 'emailAddresses,names',
  }
  try {
    const responseQueryContacts = await contactApi().queryContacts(params)
    if (responseQueryContacts.status === 200) {
      const {
        data: { results },
      } = responseQueryContacts

      const mappedResults =
        results && results.length > 0
          ? results.map(
              (contact: any): IContact => ({
                name: Object.prototype.hasOwnProperty.call(
                  contact.person,
                  'names'
                )
                  ? contact.person.names[0].displayName
                  : contact.person.emailAddresses[0].value,
                emailAddress: contact.person.emailAddresses[0].value,
              })
            )
          : []

      dispatch(setAllContacts(mappedResults))
      dispatch(setContactsLoaded(JSON.stringify(Date.now())))
    }
  } catch (err) {
    dispatch(
      setSystemStatusUpdate({
        type: 'error',
        message: 'Error fetching contacts.',
      })
    )
  } finally {
    setCompletedSearch(true)
  }
}

const filterOptions: any = (
  options: IContact[],
  { inputValue }: { inputValue: string }
) => matchSorter(options, inputValue, { keys: ['name', 'emailAddress'] })

const EmailInput = (props: IEmailInputProps) => {
  const {
    handleChange,
    handleDelete,
    id,
    inputValue,
    registerOnKeyDown,
    setInputValue,
    valueState,
    willAutoFocus,
  } = props
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<readonly IContact[]>([])
  const [completedSearch, setCompletedSearch] = useState(true)
  const debouncedInputValue: string = useDebounce(inputValue, 500)
  const availableContacts: IContact[] = useAppSelector(selectAllContacts)
  const contactsLoaded = useAppSelector(selectContactsLoaded)
  const dispatch = useAppDispatch()

  // Wait for fetching new results, if the current query already has some results. Only search for more after 1 sec.
  useEffect(() => {
    let mounted = true
    if (
      debouncedInputValue &&
      debouncedInputValue.length > 1 &&
      !completedSearch
    ) {
      ;(async () => {
        const foundResults = filterOptions(availableContacts, {
          inputValue: debouncedInputValue,
        })
        if (foundResults.length === 0) {
          fetchContacts({ dispatch, inputValue, setCompletedSearch })
        }
        if (foundResults.length > 0) {
          setTimeout(
            () => fetchContacts({ dispatch, inputValue, setCompletedSearch }),
            1000
          )
        }
      })()
    }
    if (mounted) {
      setOptions(availableContacts)
    }
    return () => {
      mounted = false
    }
  }, [debouncedInputValue, contactsLoaded, completedSearch])

  // Only attempt a fetch for details when the user changes the input again
  useEffect(() => {
    if (completedSearch && debouncedInputValue.length > 0) {
      setCompletedSearch(false)
    }
  }, [debouncedInputValue])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  // If user changes focus and there is incomplete input, attempt to complete it.
  const handleIncompleteInput = useCallback(
    (incompleteProps: IHandleIncompleteInput) => {
      const inputObject = {
        name: incompleteProps.inputValue,
        emailAddress: incompleteProps.inputValue,
      }
      const validation = emailValidation([inputObject])
      if (validation) {
        handleChange({
          newValue: [...valueState, inputObject],
          fieldId: incompleteProps.id,
        })
      }
    },
    [valueState]
  )

  // Clear input when a new contact chip is created.
  useEffect(() => {
    setInputValue('')
  }, [valueState])

  return (
    <Autocomplete
      filterOptions={filterOptions}
      autoHighlight
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
        handleIncompleteInput({ id, inputValue })
      }}
      value={valueState ?? []}
      isOptionEqualToValue={(option, value) =>
        option.emailAddress === value.emailAddress
      }
      getOptionLabel={(option: any) =>
        `${option.name} <${option.emailAddress}>`
      }
      options={options}
      freeSolo
      onChange={(event: any, newValue: any) =>
        handleChange({ newValue, fieldId: id })
      }
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderTags={(value: readonly IContact[], getTagProps) =>
        value.map((option: IContact, index: number) => {
          if (option) {
            return (
              <RecipientChip
                key={option.emailAddress}
                option={option}
                getTagProps={getTagProps}
                handleDelete={handleDelete}
                index={index}
              />
            )
          }
          return null
        })
      }
      renderInput={(params) => (
        <StyledTextField
          {...params}
          variant="outlined"
          fullWidth
          autoFocus={willAutoFocus}
          onKeyDown={registerOnKeyDown}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {!completedSearch ? <StyledCircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  )
}

export default EmailInput

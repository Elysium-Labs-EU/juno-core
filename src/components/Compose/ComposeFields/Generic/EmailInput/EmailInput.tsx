/* eslint-disable react/jsx-props-no-spreading */
import Autocomplete from '@mui/material/Autocomplete'
import { matchSorter } from 'match-sorter'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import RecipientChip from 'components/Elements/RecipientChip/RecipientChip'
import CustomToast from 'components/Elements/Toast/Toast'
import contactApi from 'data/contactApi'
import useDebounce from 'hooks/useDebounce'
import {
  selectAllContacts,
  selectContactsLoaded,
  setAllContacts,
  setContactsLoaded,
} from 'store/contactsSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import type { TContact } from 'store/storeTypes/contactsTypes'
import { emailValidationArray } from 'utils/emailValidation'

import StyledTextField from './EmailInputStyles'
import type {
  EmailInputProps,
  FetchContacts,
  HandleIncompleteInput,
} from './EmailInputTypes'

// TODO: Check contactsSlice to unduplicate the code.
const fetchContacts = async ({
  inputValue,
  dispatch,
  setCompletedSearch,
}: FetchContacts) => {
  const params = {
    query: inputValue,
    readMask: 'emailAddresses,names',
  }
  try {
    const responseQueryContacts = await contactApi().queryContacts(params)
    if (
      responseQueryContacts &&
      'data' in responseQueryContacts &&
      responseQueryContacts.status === 200
    ) {
      const { data } = responseQueryContacts

      dispatch(setAllContacts(data))
      dispatch(setContactsLoaded(JSON.stringify(Date.now())))
    }
  } catch (err) {
    toast.custom((t) => (
      <CustomToast
        specificToast={t}
        title="Error fetching contacts."
        variant="error"
      />
    ))
  } finally {
    setCompletedSearch(true)
  }
}

const filterOptions = (
  options: Array<TContact>,
  { inputValue }: { inputValue: string }
) => matchSorter(options, inputValue, { keys: ['name', 'emailAddress'] })

const EmailInput = ({
  handleChange,
  handleDelete,
  id,
  inputValue,
  registerOnKeyDown,
  setInputValue,
  valueState,
  willAutoFocus,
}: EmailInputProps) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<readonly TContact[]>([])
  const [completedSearch, setCompletedSearch] = useState(true)
  const debouncedInputValue = useDebounce(inputValue, 500)
  const availableContacts = useAppSelector(selectAllContacts)
  const contactsLoaded = useAppSelector(selectContactsLoaded)
  const dispatch = useAppDispatch()

  // Wait for fetching new results, if the current query already has some results. Only search for more after 1 sec.
  useEffect(() => {
    if (
      debouncedInputValue &&
      debouncedInputValue.length > 1 &&
      !completedSearch
    ) {
      ;(() => {
        const foundResults = availableContacts
          ? filterOptions(availableContacts, {
              inputValue: debouncedInputValue,
            })
          : []
        if (foundResults.length === 0) {
          void fetchContacts({ dispatch, inputValue, setCompletedSearch })
        }
        if (foundResults.length > 0) {
          setTimeout(
            () =>
              void fetchContacts({ dispatch, inputValue, setCompletedSearch }),
            1000
          )
        }
      })()
    }
    if (availableContacts) {
      setOptions(availableContacts)
    }
  }, [debouncedInputValue, contactsLoaded, completedSearch])

  // Only attempt a fetch for details when the user changes the input again
  useEffect(() => {
    if (completedSearch && debouncedInputValue.length) {
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
    (incompleteProps: HandleIncompleteInput) => {
      const inputObject = {
        name: incompleteProps.inputValue,
        emailAddress: incompleteProps.inputValue,
      }
      const validation = emailValidationArray([inputObject])
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
    if (valueState.length > 0) {
      setInputValue('')
    }
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
      value={valueState}
      isOptionEqualToValue={(option, value) =>
        option.emailAddress === value.emailAddress
      }
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option
        }
        return `${option.name} <${option.emailAddress}>`
      }}
      options={options}
      freeSolo
      onChange={(_, newValue) => {
        const validatedEmails = emailValidationArray(newValue)
        if (!validatedEmails || validatedEmails.length === 0) {
          return
        }
        handleChange({ newValue: validatedEmails, fieldId: id })
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      renderTags={(value: readonly TContact[], getTagProps) =>
        value.map((option: TContact, index: number) => {
          return (
            <RecipientChip
              key={option.emailAddress}
              option={option}
              getTagProps={getTagProps}
              handleDelete={handleDelete}
              index={index}
            />
          )
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

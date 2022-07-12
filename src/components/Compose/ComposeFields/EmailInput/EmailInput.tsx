/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import { matchSorter } from 'match-sorter'
import StyledTextField from './EmailInputStyles'
import RecipientChip from '../../../Elements/RecipientChip/RecipientChip'
import { Contact } from '../../../../store/storeTypes/contactsTypes'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  selectAllContacts,
  selectContactsLoaded,
  setAllContacts,
  setContactsLoaded,
} from '../../../../store/contactsSlice'
import contactApi from '../../../../data/contactApi'
import { setServiceUnavailable } from '../../../../store/utilsSlice'
import useDebounce from '../../../../Hooks/useDebounce'
import emailValidation from '../../../../utils/emailValidation'

interface IEmailInputProps {
  id: string
  valueState: Contact[]
  handleChange: any
  handleDelete: Function
  inputValue: string
  setInputValue: Function
  willAutoFocus: boolean
}

interface IHandleIncompleteInput {
  id: string
  inputValue: string
}

interface IFetchContacts {
  inputValue: string
  dispatch: Function
  setCompletedSearch: Function
}

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
              (contact: any): Contact => ({
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
      setCompletedSearch(true)
    }
  } catch (err) {
    dispatch(setServiceUnavailable('Error fetching contacts.'))
  }
}

const filterOptions: any = (
  options: Contact[],
  { inputValue }: { inputValue: string }
) => matchSorter(options, inputValue, { keys: ['name', 'emailAddress'] })

const emailInput = (props: IEmailInputProps) => {
  const {
    id,
    valueState,
    handleChange,
    inputValue,
    setInputValue,
    handleDelete,
    willAutoFocus,
  } = props
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<readonly Contact[]>([])
  const [completedSearch, setCompletedSearch] = useState(false)
  const debouncedInputValue: string = useDebounce(inputValue, 500)
  const availableContacts: Contact[] = useAppSelector(selectAllContacts)
  const contactsLoaded: string = useAppSelector(selectContactsLoaded)
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
    if (completedSearch) {
      setCompletedSearch(false)
    }
  }, [debouncedInputValue])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  // If user changes focus and there is incomplete input, attempt to complete it.
  const handleIncompleteInput = (incompleteProps: IHandleIncompleteInput) => {
    const validation = emailValidation([
      {
        name: incompleteProps.inputValue,
        emailAddress: incompleteProps.inputValue,
      },
    ])
    if (validation) {
      handleChange({
        newValue: [...valueState, incompleteProps.inputValue],
        fieldId: incompleteProps.id,
      })
    }
  }

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
      renderTags={(value: readonly Contact[], getTagProps) =>
        value.map((option: Contact, index: number) => {
          if (option) {
            return (
              <RecipientChip
                key={option.emailAddress}
                option={option}
                getTagProps={getTagProps}
                handleDelete={handleDelete}
                index={index}
                id={id}
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
        />
      )}
    />
  )
}

export default emailInput

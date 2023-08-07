import type { Dispatch, SetStateAction } from 'react'

import type { RecipientsList } from 'components/Compose/ComposeEmailTypes'
import type { AppDispatch } from 'store/store'
import type { TContact } from 'store/storeTypes/contactsTypes'

export interface HandleIncompleteInput {
  id: string
  inputValue: string
}

export interface FetchContacts {
  inputValue: string
  dispatch: AppDispatch
  setCompletedSearch: Dispatch<SetStateAction<boolean>>
}

export interface EmailInputProps {
  handleChange: (recipientListRaw: RecipientsList) => void
  handleDelete: (value: TContact) => void
  id: string
  inputValue: string
  registerOnKeyDown: () => void
  setInputValue: Dispatch<SetStateAction<string>>
  valueState: Array<TContact>
  willAutoFocus: boolean
}

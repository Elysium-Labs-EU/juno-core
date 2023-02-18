import type { Dispatch, SetStateAction } from 'react'

import type { IRecipientsList } from 'components/Compose/ComposeEmailTypes'
import type { AppDispatch } from 'store/store'
import type { TContact } from 'store/storeTypes/contactsTypes'

export interface IHandleIncompleteInput {
  id: string
  inputValue: string
}

export interface IFetchContacts {
  inputValue: string
  dispatch: AppDispatch
  setCompletedSearch: Dispatch<SetStateAction<boolean>>
}

export interface IEmailInputProps {
  handleChange: (recipientListRaw: IRecipientsList) => void
  handleDelete: (value: any) => void
  id: string
  inputValue: string
  registerOnKeyDown: () => void
  setInputValue: Dispatch<SetStateAction<string>>
  valueState: Array<TContact>
  willAutoFocus: boolean
}

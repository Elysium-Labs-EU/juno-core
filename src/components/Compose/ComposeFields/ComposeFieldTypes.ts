import type { Dispatch, SetStateAction } from 'react'

import type { IContact } from 'store/storeTypes/contactsTypes'

export interface IContactField {
  composeValue?: Array<IContact>
  dataCy?: string
  hasInteracted: boolean
  id: string
  label: string
  loadState: string
  setHasInteracted: Dispatch<SetStateAction<boolean>>
  showField: boolean
  updateComposeEmail: (object: { id: string; value: Array<IContact> }) => void
}

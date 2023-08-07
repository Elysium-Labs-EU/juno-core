import type { Dispatch, SetStateAction } from 'react'

import type { TContact } from 'store/storeTypes/contactsTypes'

export interface ContactFieldProps {
  composeValue?: Array<TContact>
  dataCy?: string
  hasInteracted: boolean
  id: string
  label: string
  loadState: string
  setHasInteracted: Dispatch<SetStateAction<boolean>>
  showField: boolean
  updateComposeEmail: (object: { id: string; value: Array<TContact> }) => void
}

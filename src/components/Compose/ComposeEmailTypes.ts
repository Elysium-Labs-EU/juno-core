import type { TContact } from 'store/storeTypes/contactsTypes'

export interface RecipientsList {
  fieldId: string
  newValue: Array<TContact>
}

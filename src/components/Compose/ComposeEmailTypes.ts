import type { TContact } from 'store/storeTypes/contactsTypes'

export interface IRecipientsList {
  fieldId: string
  newValue: Array<TContact>
}

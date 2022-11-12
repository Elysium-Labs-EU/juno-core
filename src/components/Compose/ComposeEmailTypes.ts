import { IContact } from 'store/storeTypes/contactsTypes'

export interface IRecipientsList {
  fieldId: string
  newValue: IContact[]
}

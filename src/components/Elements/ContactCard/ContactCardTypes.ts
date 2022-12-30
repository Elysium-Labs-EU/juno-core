import type { PopperPlacementType } from '@mui/material/Popper'

import type { IContact } from 'store/storeTypes/contactsTypes'

export interface IContactCard {
  userEmail: string
  children: JSX.Element
  contact: IContact
  offset?: [number, number]
  placement?: PopperPlacementType
}

import type { PopperPlacementType } from '@mui/material/Popper'
import type { MutableRefObject } from 'react'

import type { TContact } from 'store/storeTypes/contactsTypes'

export interface IContactCard {
  userEmail: string
  children: JSX.Element
  contact: TContact
  offset?: [number, number]
  placement?: PopperPlacementType
}

export interface IContactCardPopper
  extends Pick<IContactCard, 'contact' | 'offset' | 'placement'> {
  contactCardPopperId: string | undefined
  contactCardWrapper: MutableRefObject<HTMLElement | null>
  isHovering: boolean
  staticInitials: string
}

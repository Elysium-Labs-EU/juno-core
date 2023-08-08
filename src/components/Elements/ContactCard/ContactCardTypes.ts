import type { PopperPlacementType } from '@mui/material/Popper'
import type { MutableRefObject } from 'react'

import type { TContact } from 'store/storeTypes/contactsTypes'

export interface ContactCardProps {
  userEmail: string | undefined | null
  children: JSX.Element
  contact: TContact
  offset?: [number, number]
  placement?: PopperPlacementType
}

export interface ContactCardPopperProps
  extends Pick<ContactCardProps, 'contact' | 'offset' | 'placement'> {
  contactCardPopperId: string | undefined
  contactCardWrapper: MutableRefObject<HTMLElement | null>
  isHovering: boolean
  staticInitials: string
}

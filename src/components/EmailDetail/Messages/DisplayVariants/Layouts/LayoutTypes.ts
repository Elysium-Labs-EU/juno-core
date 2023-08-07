import type { ReactNode } from 'react'

import type getEmailSubject from 'components/Elements/EmailSubject'
import type getSenderNameFull from 'components/Elements/SenderName/getSenderNameFull'
import type getSenderNamePartial from 'components/Elements/SenderName/getSenderNamePartial'
import type { IReadMessage } from 'components/EmailDetail/EmailDetailTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

import type { getRemovedTrackers } from '../ReadUnreadMessage'

interface BaseLayoutType {
  handleClick: () => void
  isDraft?: boolean
  message: IReadMessage['message']
  senderNameFull: ReturnType<typeof getSenderNameFull>
  senderNamePartial: ReturnType<typeof getSenderNamePartial>
}

export interface OpenMessageLayoutProps extends BaseLayoutType {
  draftHeaderControls?: ReactNode
  emailSubject: ReturnType<typeof getEmailSubject>
  hideMessage?: boolean
  labelIds?: TLabelState['labelIds']
  removedTrackers?: ReturnType<typeof getRemovedTrackers>
  specificEmailOptions?: ReactNode
}

export interface ClosedMessageLayoutProps extends BaseLayoutType {
  emailSnippet: string
}

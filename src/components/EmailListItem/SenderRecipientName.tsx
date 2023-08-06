import { DRAFT_LABEL } from 'constants/globalConstants'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

import * as S from './EmailListItemStyles'
import type getRecipientName from './Utils/getRecipientName'
import type getSenderFull from './Utils/getSenderFull'
import type getSenderPartial from './Utils/getSenderPartial'

interface ISenderRecipientName {
  handleOpenEvent: () => void
  labelIds: TLabelState['labelIds']
  recipientName: ReturnType<typeof getRecipientName>
  senderFull: ReturnType<typeof getSenderFull>
  senderPartial: ReturnType<typeof getSenderPartial>
}

const SenderRecipientName = ({
  labelIds,
  senderFull,
  senderPartial,
  recipientName,
  handleOpenEvent,
}: ISenderRecipientName) => {
  const labelIdsHasDraft = labelIds.includes(DRAFT_LABEL)
  if (senderFull && senderPartial && !labelIdsHasDraft)
    return (
      <S.TruncatedSpan
        title={senderPartial.emailAddress ?? ''}
        data-testid="email-sender"
        onClick={handleOpenEvent}
      >
        {senderPartial.name ?? senderPartial.emailAddress}
      </S.TruncatedSpan>
    )
  if (labelIdsHasDraft && recipientName && senderPartial) {
    return (
      <S.TruncatedSpan
        title={recipientName.emailAddress ?? ''}
        data-testid="email-recipient"
        onClick={handleOpenEvent}
      >
        {recipientName.name}
      </S.TruncatedSpan>
    )
  }
  return null
}

export default SenderRecipientName

import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import { DRAFT_LABEL } from 'constants/globalConstants'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

import {
  getRecipientName,
  getSenderFull,
  getSenderPartial,
} from './EmailListItem'

interface IContactCardAvatar {
  labelIds: TLabelState['labelIds']
  recipientName: ReturnType<typeof getRecipientName>
  senderFull: ReturnType<typeof getSenderFull>
  senderPartial: ReturnType<typeof getSenderPartial>
}

const ContactCardAvatar = ({
  labelIds,
  senderFull,
  senderPartial,
  recipientName,
}: IContactCardAvatar) => {
  const labelIdsHasDraft = labelIds.includes(DRAFT_LABEL)
  if (senderFull && senderPartial && !labelIdsHasDraft)
    return (
      <ContactCard
        offset={[30, 10]}
        userEmail={senderFull}
        contact={senderPartial}
      >
        <EmailAvatar userEmail={senderFull} />
      </ContactCard>
    )
  if (labelIdsHasDraft && recipientName && senderPartial) {
    return (
      <ContactCard
        offset={[30, 10]}
        userEmail={recipientName.name}
        contact={senderPartial}
      >
        <EmailAvatar userEmail={recipientName.name} />
      </ContactCard>
    )
  }
  return null
}

export default ContactCardAvatar

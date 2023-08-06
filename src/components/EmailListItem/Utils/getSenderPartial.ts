import getSenderNamePartial from 'components/Elements/SenderName/getSenderNamePartial'

import type { IExtractEmailData } from '../EmailListItem'

// TODO: Figure out import and unduplicate functions

export default function getSenderPartial({
  emailAddress,
  memoizedDraftOrRegular,
}: IExtractEmailData) {
  const lastMessage =
    memoizedDraftOrRegular.messages[memoizedDraftOrRegular.messages.length - 1]
  if (lastMessage) {
    return getSenderNamePartial(lastMessage.payload.headers.from, emailAddress)
  }
  return null
}

import getSenderNameFull from 'components/Elements/SenderName/getSenderNameFull'

import type { IExtractEmailData } from '../EmailListItem'

export default function getSenderFull({
  emailAddress,
  memoizedDraftOrRegular,
}: IExtractEmailData) {
  const lastMessage =
    memoizedDraftOrRegular.messages[memoizedDraftOrRegular.messages.length - 1]
  if (lastMessage) {
    return getSenderNameFull(lastMessage.payload.headers.from, emailAddress)
  }
  return null
}

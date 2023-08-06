import recipientName from 'components/Elements/RecipientName'

import type { IExtractEmailData } from '../EmailListItem'

export default function getRecipientName({
  emailAddress,
  memoizedDraftOrRegular,
}: IExtractEmailData) {
  const lastMessage =
    memoizedDraftOrRegular.messages[memoizedDraftOrRegular.messages.length - 1]
  if (lastMessage) {
    return recipientName(lastMessage.payload.headers.to, emailAddress)
  }
  return null
}

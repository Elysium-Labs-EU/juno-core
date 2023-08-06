import emailSnippet from 'components/Elements/EmailSnippet'

import type { IExtractEmailData } from '../EmailListItem'

export default function getSnippet({
  memoizedDraftOrRegular,
}: Pick<IExtractEmailData, 'memoizedDraftOrRegular'>) {
  const lastMessage =
    memoizedDraftOrRegular.messages[memoizedDraftOrRegular.messages.length - 1]
  if (lastMessage) {
    return emailSnippet(lastMessage)
  }
  return null
}

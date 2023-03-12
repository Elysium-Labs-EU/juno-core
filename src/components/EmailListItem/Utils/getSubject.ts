import emailSubject from 'components/Elements/EmailSubject'

import type { IExtractEmailData } from '../EmailListItem'

export default function getSubject({
  memoizedDraftOrRegular,
}: Pick<IExtractEmailData, 'memoizedDraftOrRegular'>) {
  const lastMessage =
    memoizedDraftOrRegular.messages![
      memoizedDraftOrRegular.messages!.length - 1
    ]
  if (lastMessage) {
    return emailSubject(lastMessage?.payload?.headers?.subject)
  }
  return null
}

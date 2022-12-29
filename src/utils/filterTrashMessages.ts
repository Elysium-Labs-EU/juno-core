import * as global from 'constants/globalConstants'
import type {
  IEmailListThreadItem,
  IEmailMessage,
} from 'store/storeTypes/emailListTypes'

const filterTrashMessages = (
  thread: IEmailListThreadItem,
  labelIds: string[]
) => {
  // Don't filter trash messages on search
  if (labelIds.includes(global.SEARCH_LABEL)) return thread

  const threadMessages = thread?.messages
    ? thread.messages.filter((m) => !m.labelIds.includes(global.TRASH_LABEL))
    : ([] as IEmailMessage[])
  return { ...thread, messages: threadMessages }
}

export default filterTrashMessages

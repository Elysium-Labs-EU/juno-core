import {
  IEmailListThreadItem,
  IEmailMessage,
} from '../store/storeTypes/emailListTypes'
import * as global from '../constants/globalConstants'

const filterTrashMessages = (thread: IEmailListThreadItem) => {
  const threadMessages = thread?.messages
    ? thread.messages.filter((m) => !m.labelIds.includes(global.TRASH_LABEL))
    : ([] as IEmailMessage[])
  return { ...thread, messages: threadMessages }
}

export default filterTrashMessages

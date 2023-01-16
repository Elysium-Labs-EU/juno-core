import * as global from 'constants/globalConstants'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

/**
 * Filters trash messages from an email thread
 * @param {IEmailListThreadItem | undefined} thread - The email thread to filter
 * @param {Array<string>} labelIds - The list of label ids to filter by
 * @returns {IEmailListThreadItem} - The email thread with trash messages filtered out
 */

const filterTrashMessages = (
  thread: IEmailListThreadItem | undefined | null,
  labelIds: Array<string>
) => {
  if (!thread || labelIds.includes(global.SEARCH_LABEL)) return thread

  const threadMessages = thread.messages.filter(
    (m) => !m.labelIds.includes(global.TRASH_LABEL)
  )
  return { ...thread, messages: threadMessages }
}

export default filterTrashMessages

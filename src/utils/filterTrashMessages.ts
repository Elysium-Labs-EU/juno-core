import * as global from 'constants/globalConstants'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

/**
 * Filters trash messages from an email thread
 * @param {TThreadObject | undefined} thread - The email thread to filter
 * @param {Array<string>} labelIds - The list of label ids to filter by
 * @returns {TThreadObject} - The email thread with trash messages filtered out
 */

const filterTrashMessages = (
  thread: TThreadObject | undefined | null,
  labelIds: TLabelState['labelIds']
) => {
  if (
    !thread ||
    labelIds.includes(global.SEARCH_LABEL) ||
    labelIds.includes(global.TRASH_LABEL)
  )
    return thread

  const threadMessages = thread.messages.filter(
    (m) => !m.labelIds.includes(global.TRASH_LABEL)
  )
  return { ...thread, messages: threadMessages }
}

export default filterTrashMessages

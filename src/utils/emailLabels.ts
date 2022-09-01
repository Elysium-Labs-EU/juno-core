import * as global from '../constants/globalConstants'
import { IEmailListThreadItem } from '../store/storeTypes/emailListTypes'

// TODO: Recheck if this function should be checking on all the messages in the thread, not just index 0

/**
 * @function emailLabels
 * @param emailListThreadItem - takes in a the thread item
 * @returns returns the email labels for the email top email list item. If nothing can be found, send back the Archive label.
 */

const emailLabels = (emailListThreadItem: IEmailListThreadItem) => {
  if (emailListThreadItem?.messages)
    return emailListThreadItem?.messages[0]?.labelIds ?? [global.ARCHIVE_LABEL]
  return [global.ARCHIVE_LABEL]
}

export default emailLabels

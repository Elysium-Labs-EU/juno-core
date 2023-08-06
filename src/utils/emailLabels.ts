import * as global from 'constants/globalConstants'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'

import { onlyLegalLabelStrings } from './onlyLegalLabels'

/**
 * @function emailLabels
 * @param emailListThreadItem - takes in a the thread item
 * @returns returns the legal email labels for the email thread. If an error occurs, send back the Archive label.
 */

const emailLabels = (
  emailListThreadItem: TThreadObject,
  storageLabels: TLabelState['storageLabels']
) => {
  if (emailListThreadItem.messages) {
    const getAllLegalMessagesLabelIds = () => {
      const foundLabels: string[] = []
      emailListThreadItem.messages.forEach((message) =>
        message.labelIds.forEach((label) => foundLabels.push(label))
      )
      return [
        ...new Set(
          onlyLegalLabelStrings({
            labelIds: foundLabels,
            storageLabels,
          }).filter(
            (label) =>
              label !== global.SENT_LABEL && label !== global.DRAFT_LABEL
          )
        ),
      ]
    }
    return getAllLegalMessagesLabelIds() ?? [global.ARCHIVE_LABEL]
  }
  return [global.ARCHIVE_LABEL]
}

export default emailLabels

import * as global from 'constants/globalConstants'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

/**
 * @function getTimeStamp
 * @param email the emailListItem that is used to get the timestamp
 * @param useAllMessages an optional flag to bypass the filtering on draft messages
 * @returns
 */

export default function getTimeStamp(
  email: IEmailListThreadItem,
  useAllMessages?: boolean
): string {
  if (email?.messages) {
    return email.messages[
      useAllMessages
        ? email.messages.length - 1
        : email.messages.filter(
            (message) => !message.labelIds.includes(global.DRAFT_LABEL)
          ).length - 1
    ]
      ? email.messages[
          useAllMessages
            ? email.messages.length - 1
            : email.messages.filter(
                (message) => !message.labelIds.includes(global.DRAFT_LABEL)
              ).length - 1
        ].internalDate
      : ''
  }
  return ''
}

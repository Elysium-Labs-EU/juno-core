import * as global from 'constants/globalConstants'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'

/**
 * @function getTimeStamp
 * @param email the emailListItem that is used to get the timestamp
 * @param useAllMessages an optional flag to bypass the filtering on draft messages
 * @returns
 */

export default function getTimeStamp(
  email: TThreadObject,
  useAllMessages?: boolean
): string {
  const messages = email.messages.filter(
    (message) =>
      useAllMessages || !message.labelIds.includes(global.DRAFT_LABEL)
  )
  const latestMessage = messages[messages.length - 1]
  return latestMessage?.internalDate ?? ''
}

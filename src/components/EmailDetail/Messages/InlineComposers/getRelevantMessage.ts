import { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

/**
 * @function getRelevantMessage
 * @description Based on the selected index fetch the matching message in the thread.
 * @returns a message object from the input thread
 * */

export default function getRelevantMessage({
  selectedIndex,
  localThreadDetail,
}: {
  selectedIndex: number | undefined
  localThreadDetail: IEmailListThreadItem
}) {
  if (selectedIndex !== undefined) {
    return localThreadDetail.messages[
      localThreadDetail.messages.length - 1 - selectedIndex
    ]
  }
  return localThreadDetail.messages[0]
}

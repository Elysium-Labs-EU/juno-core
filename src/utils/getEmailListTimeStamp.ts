import format from 'date-fns/format'

import type { TEmailListObject } from 'store/storeTypes/emailListTypes'

export default function getEmailListTimeStamp(
  emailList: Array<TEmailListObject>,
  activeEmailListIndex: number
) {
  const timeStamp = emailList[activeEmailListIndex]?.timestamp
  if (timeStamp) {
    return `Last updated at ${format(timeStamp, 'PPpp')}`
  }
  return undefined
}

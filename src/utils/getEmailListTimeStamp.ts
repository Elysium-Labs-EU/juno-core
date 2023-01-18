import format from 'date-fns/format'

import type { IEmailListObject } from 'store/storeTypes/emailListTypes'

export default function getEmailListTimeStamp(
  emailList: Array<IEmailListObject>,
  activeEmailListIndex: number
) {
  const timeStamp = emailList[activeEmailListIndex]?.timestamp
  if (timeStamp) {
    return `Last updated at ${format(timeStamp, 'PPpp')}`
  }
  return undefined
}

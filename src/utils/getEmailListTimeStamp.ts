import format from 'date-fns/format'
import { IEmailListObject } from 'store/storeTypes/emailListTypes'

export default function getEmailListTimeStamp(
  emailList: IEmailListObject[],
  activeEmailListIndex: number
) {
  const timeStamp = emailList[activeEmailListIndex]?.timestamp
  if (timeStamp) {
    return `Last updated at ${format(timeStamp, 'PPpp')}`
  }
  return undefined
}

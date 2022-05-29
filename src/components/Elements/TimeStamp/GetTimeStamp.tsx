import { IEmailListThreadItem } from '../../../Store/storeTypes/emailListTypes'

const GetTimeStamp = (email: IEmailListThreadItem): string => {
  if (email?.messages) {
    return email.messages[email.messages.length - 1].internalDate
  }
  if (email?.message) {
    return email.message.internalDate
  }
  return ''
}

export default GetTimeStamp

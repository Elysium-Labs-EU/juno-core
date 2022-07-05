import { IEmailListThreadItem } from '../../../Store/storeTypes/emailListTypes'

const GetTimeStamp = (email: IEmailListThreadItem): string => {
  if (email?.messages) {
    return email.messages[email.messages.length - 1]
      ? email.messages[email.messages.length - 1].internalDate
      : ''
  }
  return ''
}

export default GetTimeStamp

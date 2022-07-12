import * as global from '../constants/globalConstants'
import { IEmailListThreadItem } from '../store/storeTypes/emailListTypes'

const emailLabels = (emailListThreadItem: IEmailListThreadItem) => {
  if (emailListThreadItem?.messages)
    return emailListThreadItem?.messages[0]?.labelIds ?? [global.ARCHIVE_LABEL]
  return [global.ARCHIVE_LABEL]
}

export default emailLabels

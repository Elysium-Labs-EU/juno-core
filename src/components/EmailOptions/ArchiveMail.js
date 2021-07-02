import { NavigateNextMail } from '../../utils'
import * as inbox from '../../constants/inboxConstants'
import messageApi from '../../data/messageApi'

const api = messageApi()

const ArchiveMail = (messageId, history, labelURL, emailList, viewIndex) => {
  const ARCHIVE_ACTION = { removeLabelIds: [inbox.LABEL] }

  const MarkEmailArchived = async () => {
    await api.updateMessage(messageId, ARCHIVE_ACTION)
    NavigateNextMail({ history, labelURL, emailList, viewIndex })
  }

  return MarkEmailArchived()
}

export default ArchiveMail

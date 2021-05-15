import { createApiClient } from '../../data/api'
import { NavigateNextMail } from '../../utils'

const api = createApiClient()

const ArchiveMail = (messageId, history, labelURL, emailList, viewIndex) => {
  const ARCHIVE_ACTION = { removeLabelIds: ['INBOX'] }

  const MarkEmailArchived = async () => {
    await api.updateMessage(messageId, ARCHIVE_ACTION)
    NavigateNextMail(history, labelURL, emailList, viewIndex)
  }

  return MarkEmailArchived()
}

export default ArchiveMail

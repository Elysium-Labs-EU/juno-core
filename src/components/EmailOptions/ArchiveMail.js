import { createApiClient } from '../../data/api'

const api = createApiClient()

const ArchiveMail = async ({ messageId }) => {
  const ARCHIVE_ACTION = { removeLabelIds: ['INBOX'] }
  await api.updateMessage(messageId, ARCHIVE_ACTION)
}

export default ArchiveMail

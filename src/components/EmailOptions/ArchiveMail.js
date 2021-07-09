import * as inbox from '../../constants/inboxConstants'
import messageApi from '../../data/messageApi'
import NavigateNextMail from '../../utils/navigateNextEmail'

const ArchiveMail = ({
  messageId,
  history,
  labelURL,
  filteredMetaList,
  viewIndex,
  labelIds,
  location,
}) => {
  const request = { removeLabelIds: [inbox.LABEL] }

  // console.log(labelIds)
  console.log(messageId)
  console.log(location)
  console.log(filteredMetaList)

  const MarkEmailArchived = async () => {
    // await messageApi().updateMessage({ messageId, request })
    if (location.pathname.includes('/mail/')) {
      console.log('here')
      NavigateNextMail({ history, labelURL, filteredMetaList, viewIndex })
    }
  }

  return MarkEmailArchived()
}

export default ArchiveMail

import { FindLabelById } from '.'
import Routes from '../constants/routes.json'

const CloseMail = (props) => {
  const { history, labelIds, storageLabels } = props
  FindLabelById({ storageLabels, labelIds })

  const labelMap = {
    INBOX: `${Routes.INBOX}`,
    'Juno/To Do': `${Routes.HOME}`,
    SPAM: `${Routes.SPAM}`,
    DRAFT: `${Routes.DRAFTS}`,
    SENT: `${Routes.SENT}`,
  }

  return history.push(
    labelMap[FindLabelById({ storageLabels, labelIds })[0].name]
  )
}

export default CloseMail

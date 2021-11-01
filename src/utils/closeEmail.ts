import { History } from 'history'
import { FindLabelById } from '.'
import Routes from '../constants/routes.json'
import { LabelIdName } from '../Store/labelsTypes'

interface CloseMailProps {
  history: History
  labelIds: string[]
  storageLabels: LabelIdName[]
}

const CloseMail = (props: CloseMailProps) => {
  const { history, labelIds, storageLabels } = props
  FindLabelById({ storageLabels, labelIds })

  const labelMap: { [key: string]: string } = {
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

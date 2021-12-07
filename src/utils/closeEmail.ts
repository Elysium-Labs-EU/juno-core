import { push } from 'redux-first-history'
import { FindLabelById } from './findLabel'
import Routes from '../constants/routes.json'
import { LabelIdName } from '../Store/labelsTypes'

interface CloseMailProps {
  labelIds: string[]
  storageLabels: LabelIdName[]
  dispatch: any
}

const CloseMail = (props: CloseMailProps) => {
  const { dispatch, labelIds, storageLabels } = props
  FindLabelById({ storageLabels, labelIds })

  const labelMap: { [key: string]: string } = {
    INBOX: `${Routes.INBOX}`,
    'Juno/To Do': `${Routes.HOME}`,
    SPAM: `${Routes.SPAM}`,
    DRAFT: `${Routes.DRAFTS}`,
    SENT: `${Routes.SENT}`,
  }

  return dispatch(
    push(labelMap[FindLabelById({ storageLabels, labelIds })[0].name])
  )
}

export default CloseMail

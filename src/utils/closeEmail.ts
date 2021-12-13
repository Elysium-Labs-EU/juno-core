import { push } from 'redux-first-history'
import { FindLabelById } from './findLabel'
import Routes from '../constants/routes.json'
import { LabelIdName } from '../Store/labelsTypes'

interface CloseMailProps {
  labelIds: string[]
  storageLabels: LabelIdName[]
  dispatch: any
}

const labelMap: { [key: string]: string } = {
  INBOX: `${Routes.INBOX}`,
  'Juno/To Do': `${Routes.HOME}`,
  SPAM: `${Routes.SPAM}`,
  DRAFT: `${Routes.DRAFTS}`,
  SENT: `${Routes.SENT}`,
}

const CloseMail = (props: CloseMailProps) => {
  const { dispatch, labelIds, storageLabels } = props
  const foundLabel = FindLabelById({ storageLabels, labelIds })
  if (foundLabel.length > 0) {
    return dispatch(push(labelMap[foundLabel[0].name]))
  }
  if (foundLabel.length === 0) {
    return dispatch(push('/'))
  }
  return null
}

export default CloseMail

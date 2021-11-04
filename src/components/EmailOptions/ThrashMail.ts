import { History } from 'history'
import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { LocationObjectType } from '../types/globalTypes'

interface ThrashMailProps {
  messageId: string
  history: History
  labelIds: string[]
  location: LocationObjectType
  dispatch: any
}

const ThrashMail = (props: ThrashMailProps) => {
  const { messageId, history, labelIds, location, dispatch } = props
  const request = { delete: true }

  const MarkEmailThrashed = () => {
    dispatch(
      UpdateMetaListLabel({
        messageId,
        request,
        history,
        location,
        labelIds,
      })
    )
  }

  return MarkEmailThrashed()
}

export default ThrashMail

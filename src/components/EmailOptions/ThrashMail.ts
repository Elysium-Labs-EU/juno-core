import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { convertArrayToString } from '../../utils'
import { LocationObjectType } from '../types/globalTypes'

interface ThrashMailProps {
  messageId: string
  history: any
  labelIds: string[]
  location: LocationObjectType
  dispatch: any
}

const ThrashMail = (props: ThrashMailProps) => {
  const { messageId, history, labelIds, location, dispatch } = props
  const labelURL = labelIds && convertArrayToString(labelIds)
  const request = { delete: true }

  const MarkEmailThrashed = () => {
    dispatch(
      UpdateMetaListLabel({
        messageId,
        request,
        history,
        location,
        labelURL,
        labelIds,
      })
    )
  }

  return MarkEmailThrashed()
}

export default ThrashMail

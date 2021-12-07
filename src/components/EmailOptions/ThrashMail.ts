import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { LocationObjectType } from '../types/globalTypes'

interface ThrashMailProps {
  messageId: string
  labelIds: string[]
  location: LocationObjectType
  dispatch: any
}

const ThrashMail = (props: ThrashMailProps) => {
  const { messageId, labelIds, location, dispatch } = props
  const request = { delete: true }

  const MarkEmailThrashed = () => {
    dispatch(
      UpdateMetaListLabel({
        messageId,
        request,
        location,
        labelIds,
      })
    )
  }

  return MarkEmailThrashed()
}

export default ThrashMail

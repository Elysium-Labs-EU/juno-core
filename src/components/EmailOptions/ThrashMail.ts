import { updateEmailLabel } from '../../store/emailListSlice'
import { AppDispatch } from '../../store/store'

interface IThrashMailProps {
  threadId: string
  labelIds: string[]
  dispatch: AppDispatch
  location?: any
}

const thrashMail = ({
  threadId,
  labelIds,
  dispatch,
  location,
}: IThrashMailProps) => {
  const markEmailThrashed = () => {
    dispatch(
      updateEmailLabel({
        threadId,
        request: { delete: true },
        labelIds,
        location,
      })
    )
  }

  return markEmailThrashed()
}

export default thrashMail

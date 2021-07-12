import { convertArrayToString } from '.'
import { OpenDraftEmail } from '../Store/draftsSlice'
import * as draft from '../constants/draftConstants'

const openEmail = (props) => {
  const { labelIds, history, id, messageId, email, dispatch } = props
  const { LABEL } = draft
  const labelURL = convertArrayToString(labelIds)

  if (!labelIds.includes(LABEL)) {
    history.push(`mail/${labelURL}/${id}/messages`)
  } else {
    email.messages.length > 1 && history.push(`mail/${labelURL}/${id}/messages`)
    email.messages.length === 1 &&
      dispatch(OpenDraftEmail({ history, id, messageId }))
  }
}

export default openEmail

import { convertArrayToString } from '.'
import { OpenDraftEmail } from '../Store/draftsSlice'
import * as draft from '../constants/draftConstants'

const openEmail = (props) => {
  const { labelIds, history, id, email, dispatch } = props
  const { LABEL } = draft
  const labelURL = convertArrayToString(labelIds)
  if (!labelIds.includes(LABEL)) {
    history.push(`mail/${labelURL}/${id}`)
  } else {
    email.messages.length > 1 && history.push(`mail/${labelURL}/${id}`)
    email.messages.length === 1 &&
      dispatch(OpenDraftEmail({ history, id, LABEL }))
  }
}

export default openEmail

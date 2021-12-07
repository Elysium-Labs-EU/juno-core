import { push } from 'redux-first-history'
import { convertArrayToString } from '.'
import { OpenDraftEmail } from '../Store/draftsSlice'
import * as draft from '../constants/draftConstants'

interface OpenEmailProps {
  labelIds: string[]
  id: string
  messageId?: string
  email?: any
  dispatch?: any
}

const openEmail = (props: OpenEmailProps) => {
  const { labelIds, id, email, dispatch } = props
  const { LABEL } = draft
  const labelURL = convertArrayToString(labelIds)

  if (!labelIds.includes(LABEL)) {
    dispatch(push(`mail/${labelURL}/${id}/messages`))
  } else {
    if (email && email.messages.length > 1) {
      dispatch(push(`mail/${labelURL}/${id}/messages`))
    }
    if (email && email.messages.length === 1) {
      const messageId = email.messages[0].id
      dispatch(OpenDraftEmail({ id, messageId }))
    }
  }
}

export default openEmail

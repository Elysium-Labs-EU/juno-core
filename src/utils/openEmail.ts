import { push } from 'redux-first-history'
import { openDraftEmail } from '../Store/draftsSlice'
import * as draft from '../constants/draftConstants'
import labelURL from './createLabelURL'

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
  const staticLabelURL = labelURL(labelIds)

  if (!labelIds.includes(LABEL)) {
    dispatch(push(`/mail/${staticLabelURL}/${id}/messages`))
    return
  }
  if (labelIds.includes(LABEL)) {
    const messageId = email.messages[email.messages.length - 1].id
    dispatch(openDraftEmail({ id, messageId }))
  }
}

export default openEmail

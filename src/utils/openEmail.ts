import { push } from 'redux-first-history'
import { openDraftEmail } from '../Store/draftsSlice'
import * as draft from '../constants/draftConstants'
import * as global from '../constants/globalConstants'
import labelURL from './createLabelURL'

interface IOpenEmailProps {
  labelIds: string[]
  id: string
  messageId?: string
  email?: any
  dispatch: Function
  isSearching: boolean
}

const openEmail = (props: IOpenEmailProps) => {
  const { labelIds, id, email, dispatch, isSearching } = props
  const staticLabelURL = labelURL(labelIds)

  if (!labelIds.includes(draft.DRAFT_LABEL) && !isSearching) {
    dispatch(push(`/mail/${staticLabelURL}/${id}/messages`))
    return
  }
  if (!labelIds.includes(draft.DRAFT_LABEL) && isSearching) {
    dispatch(push(`/mail/${global.ARCHIVE_LABEL}/${id}/messages`))
    return
  }
  if (labelIds.includes(draft.DRAFT_LABEL)) {
    const messageId = email.messages[email.messages.length - 1].id
    dispatch(openDraftEmail({ id, messageId }))
  }
}

export default openEmail

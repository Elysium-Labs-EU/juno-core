import { push } from 'redux-first-history'
import { openDraftEmail } from '../Store/draftsSlice'
import * as draft from '../constants/draftConstants'
import * as global from '../constants/globalConstants'
import labelURL from './createLabelURL'
import { LabelIdName } from '../Store/labelsTypes'

interface IOpenEmailProps {
  labelIds: string[]
  id: string
  messageId?: string
  email?: any
  dispatch: Function
  isSearching: boolean
  storageLabels: LabelIdName[]
}

const openEmail = (props: IOpenEmailProps) => {
  const { labelIds, id, email, dispatch, isSearching, storageLabels } = props
  const onlyLegalLabels = labelIds.filter((label) =>
    storageLabels.map((storageLabel) => storageLabel.id).includes(label)
  )
  const staticLabelURL = labelURL(onlyLegalLabels)

  if (!onlyLegalLabels.includes(draft.DRAFT_LABEL) && !isSearching) {
    dispatch(push(`/mail/${staticLabelURL}/${id}/messages`))
    return
  }
  if (!onlyLegalLabels.includes(draft.DRAFT_LABEL) && isSearching) {
    dispatch(push(`/mail/${global.ARCHIVE_LABEL}/${id}/messages`))
    return
  }
  if (onlyLegalLabels.includes(draft.DRAFT_LABEL)) {
    const messageId = email.messages[email.messages.length - 1].id
    dispatch(openDraftEmail({ id, messageId }))
  }
}

export default openEmail

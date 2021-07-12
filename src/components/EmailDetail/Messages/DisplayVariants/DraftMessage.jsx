import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import EmailAvatar from '../../../EmailAvatar'
import TimeStamp from '../../../TimeStamp'
import { OpenDraftEmail } from '../../../../Store/draftsSlice'
import * as local from '../../../../constants/draftConstants'
import * as S from '../../EmailDetailStyles'
import { selectCurrentEmail } from '../../../../Store/emailDetailSlice'

const DraftMessage = ({ message, threadDetail }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useSelector(selectCurrentEmail)
  const messageId = message && message.id

  const AvatarURL =
    message && message.payload.headers.find((e) => e.name === 'From').value

  const From =
    message && message.payload.headers.find((e) => e.name === 'From').value

  const EmailSnippet =
    message && `${message.snippet.replace(/^(.{65}[^\s]*).*/, '$1')}` + `...`

  const handleClick = () => {
    dispatch(OpenDraftEmail({ history, id, messageId, threadDetail }))
  }

  return (
    <S.ClosedMessageWrapper onClick={handleClick} aria-hidden="true">
      <S.AvatarHeaderContainer>
        <EmailAvatar avatarURL={AvatarURL} />
        <div className="d-flex align-items-center ml-2 mt-2">
          <div className="text-truncate email-detail-from">
            <span>{From}</span>
          </div>
        </div>
      </S.AvatarHeaderContainer>
      <span style={{ fontStyle: 'italic' }}>
        {local.DRAFT_SNIPPET_INDICATOR}
        {EmailSnippet}
      </span>
      <TimeStamp threadTimeStamp={message.internalDate} />
    </S.ClosedMessageWrapper>
  )
}

export default DraftMessage

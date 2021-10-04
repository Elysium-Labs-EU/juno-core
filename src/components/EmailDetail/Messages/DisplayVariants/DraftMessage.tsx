import React from 'react'
import { useHistory } from 'react-router-dom'
import EmailAvatar from '../../../EmailAvatar'
import TimeStamp from '../../../TimeStamp'
import { OpenDraftEmail } from '../../../../Store/draftsSlice'
import * as local from '../../../../constants/draftConstants'
import * as S from '../../EmailDetailStyles'
import { selectCurrentEmail } from '../../../../Store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks'
import { MessagePayload } from '../../../../Store/draftsTypes'
import { EmailMessage } from '../../../../Store/emailListTypes'

const DraftMessage = ({ message }: { message: EmailMessage }) => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const id = useAppSelector(selectCurrentEmail)
  const messageId = message && message.id

  const AvatarURL =
    message && message.payload.headers.find((e: MessagePayload) => e.name === 'From').value

  const From =
    message && message.payload.headers.find((e: MessagePayload) => e.name === 'From').value

  const EmailSnippet = message && `${message.snippet.replace(/^(.{65}[^\s]*).*/, '$1')}...`

  const handleClick = () => {
    dispatch(OpenDraftEmail({ history, id, messageId }))
  }

  return (
    <S.ClosedMessageWrapper onClick={handleClick} aria-hidden="true">
      <S.AvatarHeaderContainer>
        <S.ClosedAvatarSender>
          <EmailAvatar avatarURL={AvatarURL} />
          <S.ClosedSender>
            <span style={{ fontStyle: 'italic' }}>{From}</span>
          </S.ClosedSender>
        </S.ClosedAvatarSender>
      </S.AvatarHeaderContainer>
      <S.ClosedSnippet>
        <span style={{ fontWeight: 'bold' }}>{local.DRAFT_SNIPPET_INDICATOR}</span>
        <span style={{ fontStyle: 'italic' }}>{EmailSnippet}</span>
      </S.ClosedSnippet>
      <TimeStamp threadTimeStamp={message.internalDate} />
    </S.ClosedMessageWrapper>
  )
}

export default DraftMessage

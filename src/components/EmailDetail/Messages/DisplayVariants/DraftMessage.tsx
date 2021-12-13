import React from 'react'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import { OpenDraftEmail } from '../../../../Store/draftsSlice'
import * as local from '../../../../constants/draftConstants'
import * as S from '../../EmailDetailStyles'
import { selectCurrentEmail } from '../../../../Store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks'
import { EmailMessage } from '../../../../Store/emailListTypes'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'

const DraftMessage = ({ message }: { message: EmailMessage }) => {
  const dispatch = useAppDispatch()
  const id = useAppSelector(selectCurrentEmail)
  const messageId = message && message.id

  const EmailSnippet = message && `${ message.snippet.replace(/^(.{65}[^\s]*).*/, '$1') }...`

  const staticSenderFull = SenderNameFull(message)

  const handleClick = () => {
    dispatch(OpenDraftEmail({ id, messageId }))
  }

  return (
    <S.ClosedMessageWrapper onClick={handleClick} aria-hidden="true">
      <S.TopContainer>
        <S.ClosedAvatarSender>
          <EmailAvatar avatarURL={staticSenderFull} />
          <S.ClosedSender>
            <span style={{ fontStyle: 'italic' }}>{staticSenderFull}</span>
          </S.ClosedSender>
        </S.ClosedAvatarSender>
      </S.TopContainer>
      <S.ClosedSnippet>
        <span style={{ fontWeight: 'bold' }}>{local.DRAFT_SNIPPET_INDICATOR}</span>
        <span style={{ fontStyle: 'italic' }}>{EmailSnippet}</span>
      </S.ClosedSnippet>
      <TimeStamp threadTimeStamp={message.internalDate} />
    </S.ClosedMessageWrapper>
  )
}

export default DraftMessage

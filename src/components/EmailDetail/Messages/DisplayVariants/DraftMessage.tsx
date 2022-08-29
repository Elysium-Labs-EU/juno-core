import { useMemo } from 'react'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import * as local from '../../../../constants/draftConstants'
import * as S from '../../EmailDetailStyles'
import { selectCurrentEmail } from '../../../../store/emailDetailSlice'
import { useAppSelector } from '../../../../store/hooks'
import { IEmailMessage } from '../../../../store/storeTypes/emailListTypes'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import { selectProfile } from '../../../../store/baseSlice'

const DraftMessage = ({
  message,
  draftIndex,
  handleClickListener,
  hideDraft,
}: {
  message: IEmailMessage
  draftIndex: number
  handleClickListener: (
    id: string,
    messageId: string,
    draftIndex: number
  ) => void
  hideDraft: boolean
}) => {
  const id = useAppSelector(selectCurrentEmail)
  const { emailAddress } = useAppSelector(selectProfile)
  const messageId = message && message.id

  const EmailSnippet =
    message && `${message.snippet.replace(/^(.{65}[^\s]*).*/, '$1')}...`

  const staticSenderNameFull = useMemo(
    () => SenderNameFull(message.payload.headers?.from, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => SenderNamePartial(message.payload.headers?.from, emailAddress),
    []
  )

  // Send back detail to the parent component to hide the draft from the list and open the composer
  const handleClickLocal = () => {
    handleClickListener(id, messageId, draftIndex)
  }

  return (
    <S.EmailClosedWrapper
      onClick={handleClickLocal}
      aria-hidden="true"
      hideDraft={hideDraft}
      isDraft
    >
      <S.ClosedMessageWrapper>
        <S.TopContainer>
          <S.ClosedAvatarSender>
            <EmailAvatar avatarURL={staticSenderNameFull} />
            <S.ClosedSender>
              <span
                style={{ fontStyle: 'italic' }}
                title={staticSenderNamePartial.emailAddress}
              >
                {staticSenderNamePartial.name}
              </span>
            </S.ClosedSender>
          </S.ClosedAvatarSender>
        </S.TopContainer>
        <S.ClosedSnippet>
          <span style={{ fontWeight: 'bold' }}>
            {local.DRAFT_SNIPPET_INDICATOR}
          </span>
          <span style={{ fontStyle: 'italic' }}>{EmailSnippet}</span>
        </S.ClosedSnippet>
        <S.TimeAttachmentContainer>
          <TimeStamp threadTimeStamp={message.internalDate} />
        </S.TimeAttachmentContainer>
      </S.ClosedMessageWrapper>
    </S.EmailClosedWrapper>
  )
}

export default DraftMessage

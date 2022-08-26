import { useCallback, useMemo } from 'react'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import * as local from '../../../../constants/draftConstants'
import * as S from '../../EmailDetailStyles'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { IEmailMessage } from '../../../../store/storeTypes/emailListTypes'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import { selectProfile } from '../../../../store/baseSlice'
import { openDraftEmail } from '../../../../store/draftsSlice'
import { selectCurrentEmail } from '../../../../store/emailDetailSlice'

const DraftMessage = ({
  message,
  hideDraft,
  index,
  indexMessageListener,
}: {
  message: IEmailMessage
  hideDraft: boolean
  index: number
  indexMessageListener: (index: number) => void
}) => {
  const dispatch = useAppDispatch()
  const id = useAppSelector(selectCurrentEmail)
  const { emailAddress } = useAppSelector(selectProfile)

  const EmailSnippet =
    message && `${message.snippet.replace(/^(.{65}[^\s]*).*/, '$1')}...`

  const staticSenderNameFull = useMemo(
    () => SenderNameFull(message, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => SenderNamePartial(message, emailAddress),
    []
  )

  const handleClick = useCallback(() => {
    dispatch(openDraftEmail({ id, messageId: message?.id }))
    // setDraftOpened(true)
    indexMessageListener(index)
  }, [])

  return (
    <S.EmailClosedWrapper
      onClick={handleClick}
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

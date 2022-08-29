import { useCallback, useEffect, useMemo, useState } from 'react'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import { openDraftEmail } from '../../../../store/draftsSlice'
import * as local from '../../../../constants/draftConstants'
import * as S from '../../EmailDetailStyles'
import {
  selectCurrentEmail,
  selectIsReplying,
} from '../../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { IEmailMessage } from '../../../../store/storeTypes/emailListTypes'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import { selectProfile } from '../../../../store/baseSlice'

const DraftMessage = ({
  message,
  draftIndex,
  indexMessageListener,
}: {
  message: IEmailMessage
  draftIndex: number
  indexMessageListener: (value: number) => void
}) => {
  const [draftOpened, setDraftOpened] = useState(false)
  const [hideDraft, setHideDraft] = useState(false)
  const dispatch = useAppDispatch()
  const isReplying = useAppSelector(selectIsReplying)
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

  /**
   * This function only hides the draft whenever the replying mode is set active.
   */
  useEffect(() => {
    let mounted = true
    if (isReplying && draftOpened && mounted) {
      setHideDraft(true)
    }
    if (!isReplying && draftOpened && mounted) {
      setHideDraft(false)
    }
    return () => {
      mounted = false
    }
  }, [isReplying, draftOpened])

  const handleClick = useCallback(() => {
    dispatch(openDraftEmail({ id, messageId }))
    setDraftOpened(true)
    indexMessageListener(draftIndex)
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

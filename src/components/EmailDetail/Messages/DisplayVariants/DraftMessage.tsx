import { useCallback, useMemo, useState } from 'react'
import { FiEdit, FiDelete } from 'react-icons/fi'
import * as GS from '../../../../styles/globalStyles'
import EmailAvatar from '../../../Elements/Avatar/EmailAvatar'
import TimeStamp from '../../../Elements/TimeStamp/TimeStampDisplay'
import * as local from '../../../../constants/draftConstants'
import * as global from '../../../../constants/globalConstants'
import * as S from '../../EmailDetailStyles'
import { selectCurrentEmail } from '../../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { IEmailMessage } from '../../../../store/storeTypes/emailListTypes'
import SenderNameFull from '../../../Elements/SenderName/senderNameFull'
import SenderNamePartial from '../../../Elements/SenderName/senderNamePartial'
import { selectProfile } from '../../../../store/baseSlice'
import EmailSubject from '../../../Elements/EmailSubject'
import EmailHasAttachment from '../../../Elements/EmailHasAttachment'
import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'
import LinkedContacts from './Recipients/LinkedContacts'
import CustomButton from '../../../Elements/Buttons/CustomButton'
import { selectDraft } from '../../../../store/draftsSlice'
import discardDraft from '../../../EmailOptions/DiscardDraft'

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
  const [open, setOpen] = useState<boolean>(true)
  const id = useAppSelector(selectCurrentEmail)
  const { emailAddress } = useAppSelector(selectProfile)
  const draftList = useAppSelector(selectDraft)
  const dispatch = useAppDispatch()

  const EmailSnippet =
    message && `${ message.snippet.replace(/^(.{65}[^\s]*).*/, '$1') }...`

  const staticSenderNameFull = useMemo(
    () => SenderNameFull(message.payload.headers?.from, emailAddress),
    []
  )
  const staticSenderNamePartial = useMemo(
    () => SenderNamePartial(message.payload.headers?.from, emailAddress),
    []
  )

  const staticEmailSubject = useMemo(
    () => EmailSubject(message.payload.headers?.subject),
    []
  )

  // Send back detail to the parent component to hide the draft from the list and open the composer
  const handleEditLocal = () => {
    handleClickListener(id, message?.id, draftIndex)
  }

  const handleOpenClose = () => {
    setOpen((currState) => !currState)
  }

  const draftMessage = useCallback(
    () => draftList.find((draft) => draft.message.id === message.id),
    [message]
  )

  const handleDiscardDraft = useCallback(() => {
    const foundDraft = draftMessage()
    if (foundDraft) {
      discardDraft({
        messageId: foundDraft.message.id,
        threadId: foundDraft.message.threadId,
        dispatch,
        draftId: foundDraft.id,
      })
    }
  }, [message])

  return !open ? (
    <S.EmailClosedWrapper
      onClick={handleOpenClose}
      aria-hidden="true"
      hideDraft={hideDraft}
      isDraft
      title="Click to open"
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
  ) : (
    <S.EmailOpenWrapper isDraft hideDraft={hideDraft}>
      <S.DraftHeaderControls>
        <GS.TextMutedSmall style={{ marginRight: '40px' }}>
          {local.DRAFT_INDICATOR_HEADER}
        </GS.TextMutedSmall>
        <CustomButton
          style={{ marginRight: '10px' }}
          label="Edit"
          title="Edit the draft"
          icon={<FiEdit />}
          suppressed
          onClick={handleEditLocal}
        />
        <CustomButton
          label="Discard"
          title="Discard the draft"
          icon={<FiDelete />}
          suppressed
          onClick={handleDiscardDraft}
        />
      </S.DraftHeaderControls>
      <div
        onClick={handleOpenClose}
        title="Click to close"
        style={{ cursor: 'pointer' }}
        aria-hidden="true"
      >
        <S.TopContainer>
          <S.HeaderFullWidth>
            <EmailAvatar avatarURL={staticSenderNameFull} />
            <S.EmailDetailTitle title={staticEmailSubject}>
              {staticEmailSubject}
            </S.EmailDetailTitle>
            <S.TimeAttachmentContainer>
              <S.ChildDiv>
                <EmailHasAttachment messages={message} />
              </S.ChildDiv>
              <S.ChildDiv>
                <TimeStamp threadTimeStamp={message.internalDate} />
              </S.ChildDiv>
            </S.TimeAttachmentContainer>
          </S.HeaderFullWidth>
        </S.TopContainer>
        <LinkedContacts message={message} />
        <S.GreyDivider />
        <S.EmailBody>
          {message && message?.payload && message?.id && (
            <EmailDetailBody
              threadDetailBody={message.payload}
              detailBodyCSS={global.EMAIL_BODY_VISIBLE}
            />
          )}
        </S.EmailBody>
      </div>
    </S.EmailOpenWrapper>
  )
}

export default DraftMessage

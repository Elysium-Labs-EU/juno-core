import { useCallback, useMemo, useState } from 'react'
import { FiEdit } from 'react-icons/fi'

import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import CustomButton from 'components/Elements/Buttons/CustomButton'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import EmailHasAttachmentSimple from 'components/Elements/EmailHasAttachmentSimple'
import EmailSubject from 'components/Elements/EmailSubject'
import SenderNameFull from 'components/Elements/SenderName/senderNameFull'
import SenderNamePartial from 'components/Elements/SenderName/senderNamePartial'
import TimeStamp from 'components/Elements/TimeStamp/TimeStampDisplay'
import EmailAttachment from 'components/EmailDetail/Attachment/EmailAttachment'
import * as S from 'components/EmailDetail/EmailDetailStyles'
import discardDraft from 'components/EmailOptions/DiscardDraft'
import * as local from 'constants/draftConstants'
import * as global from 'constants/globalConstants'
import { QiFolderTrash } from 'images/svgIcons/quillIcons'
import { selectProfile } from 'store/baseSlice'
import { selectDraftList } from 'store/draftsSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { IEmailMessage } from 'store/storeTypes/emailListTypes'
import * as GS from 'styles/globalStyles'
import findDraftMessageInList from 'utils/findDraftMessageInList'

import EmailDetailBody from '../EmailDetailBody/EmailDetailBody'
import LinkedContacts from './Recipients/LinkedContacts'

const DraftMessage = ({
  message,
  draftIndex,
  handleClickListener,
  hideDraft,
}: {
  message: IEmailMessage
  draftIndex: number
  handleClickListener: ({
    id,
    messageId,
    dIndex,
  }: {
    id: string
    messageId: string
    dIndex: number
  }) => void
  hideDraft: boolean
}) => {
  const [open, setOpen] = useState<boolean>(true)
  const { emailAddress } = useAppSelector(selectProfile)
  const draftList = useAppSelector(selectDraftList)
  const dispatch = useAppDispatch()

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

  const staticEmailSubject = useMemo(
    () => EmailSubject(message.payload.headers?.subject),
    []
  )

  // Send back detail to the parent component to hide the draft from the list and open the composer
  const handleEditLocal = useCallback(() => {
    const foundDraft = findDraftMessageInList({ draftList, target: message })
    if (foundDraft) {
      handleClickListener({
        id: foundDraft.message.id,
        messageId: foundDraft.message.id,
        dIndex: draftIndex,
      })
    }
  }, [draftList, message])

  const handleOpenClose = () => {
    setOpen((currState) => !currState)
  }

  const handleDiscardDraft = useCallback(() => {
    const foundDraft = findDraftMessageInList({ draftList, target: message })
    if (foundDraft) {
      discardDraft({
        messageId: foundDraft.message.id,
        threadId: foundDraft.message.threadId,
        dispatch,
        draftId: foundDraft.id,
      })
    }
  }, [draftList, message])

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
            <ContactCard
              offset={[30, 10]}
              userEmail={staticSenderNameFull}
              contact={staticSenderNamePartial}
            >
              <EmailAvatar userEmail={staticSenderNameFull} />
            </ContactCard>
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
        <GS.P muted small style={{ marginRight: '40px' }}>
          {local.DRAFT_INDICATOR_HEADER}
        </GS.P>
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
          icon={<QiFolderTrash />}
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
            <ContactCard
              offset={[30, 10]}
              userEmail={staticSenderNameFull}
              contact={staticSenderNamePartial}
            >
              <EmailAvatar userEmail={staticSenderNameFull} />
            </ContactCard>
            <S.EmailDetailTitle title={staticEmailSubject}>
              {staticEmailSubject}
            </S.EmailDetailTitle>
            <S.TimeAttachmentContainer>
              <S.ChildDiv>
                <EmailHasAttachmentSimple files={message?.payload?.files} />
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
        <EmailAttachment message={message} />
      </div>
    </S.EmailOpenWrapper>
  )
}

export default DraftMessage

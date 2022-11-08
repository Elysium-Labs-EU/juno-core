import { useCallback, useEffect, useMemo, useState } from 'react'
import EmailAvatar from '../Elements/Avatar/EmailAvatar'
import TimeStampDisplay from '../Elements/TimeStamp/TimeStampDisplay'
import MessageCount from '../Elements/MessageCount'
import Snippet from './Snippet'
import InlineThreadActionsRegular from './InlineThreadActionsRegular'
import * as S from './EmailListItemStyles'
import * as draft from '../../constants/draftConstants'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IEmailListThreadItem } from '../../store/storeTypes/emailListTypes'
import getTimeStamp from '../Elements/TimeStamp/GetTimeStamp'
import RecipientName from '../Elements/RecipientName'
import SenderNamePartial from '../Elements/SenderName/senderNamePartial'
import SenderNameFull from '../Elements/SenderName/senderNameFull'
import EmailSubject from '../Elements/EmailSubject'
import EmailSnippet from '../Elements/EmailSnippet'
import InlineThreadActionsDraft from './InlineThreadActionsDraft'
import { selectProfile } from '../../store/baseSlice'
import EmailLabel from '../Elements/EmailLabel'
import {
  openEmail,
  selectActiveModal,
  selectInSearch,
} from '../../store/utilsSlice'
import { selectLabelIds, selectStorageLabels } from '../../store/labelsSlice'
import emailLabels from '../../utils/emailLabels'
import {
  selectSelectedEmails,
  setSelectedEmails,
} from '../../store/emailListSlice'
import useKeyPress from '../../hooks/useKeyPress'
import EmailHasAttachmentSimple from '../Elements/EmailHasAttachmentSimple'
import ContactCard from '../Elements/ContactCard/ContactCard'
import multipleIncludes from '../../utils/multipleIncludes'
import CustomCheckbox from '../Elements/StyledCheckbox'

// If the user is on Draft list, show only draft emails.

/**
 * @function shouldUseDraftOrRegular
 * @param labelIds - all the label ids stored in Redux
 * @param email - the email list object
 * @returns a filtered version of the emaillist object, if the draft label is found.
 */
const shouldUseDraftOrRegular = (
  labelIds: string[],
  email: IEmailListThreadItem
) => {
  if (Array.isArray(labelIds) && labelIds.includes(global.DRAFT_LABEL)) {
    if (email?.messages) {
      return {
        ...email,
        messages: email.messages.filter((message) =>
          message.labelIds.includes(global.DRAFT_LABEL)
        ),
      }
    }
    return email
  }
  return email
}

const EmailListItem = ({
  email,
  showLabel,
  index,
  activeIndex,
}: {
  email: IEmailListThreadItem
  showLabel: boolean
  index: number
  activeIndex: number
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const { emailAddress } = useAppSelector(selectProfile)
  const inSearch = useAppSelector(selectInSearch)
  const activeModal = useAppSelector(selectActiveModal)
  const storageLabels = useAppSelector(selectStorageLabels)
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const labelIds = useAppSelector(selectLabelIds)
  const dispatch = useAppDispatch()
  const EnterKeyListener = useKeyPress(keyConstants.KEY_SPECIAL.enter)
  const { id } = email

  useEffect(() => {
    if (!isFocused && activeIndex === index) {
      setIsFocused(true)
    }
    if (isFocused && activeIndex !== index) {
      setIsFocused(false)
    }
  }, [activeIndex, index, isFocused])

  const staticShouldUseDraftOrRegular = useMemo(
    () => shouldUseDraftOrRegular(labelIds, email),
    [email]
  )

  const staticEmailLabels = useMemo(
    () => emailLabels(staticShouldUseDraftOrRegular, storageLabels),
    [staticShouldUseDraftOrRegular, storageLabels]
  )

  const staticRecipientName = useMemo(
    () =>
      RecipientName(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ]?.payload?.headers?.to,
        emailAddress
      ),
    [staticShouldUseDraftOrRegular]
  )
  const staticSenderPartial = useMemo(
    () =>
      SenderNamePartial(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ]?.payload?.headers?.from,
        emailAddress
      ),
    [staticShouldUseDraftOrRegular]
  )
  const staticSenderFull = useMemo(
    () =>
      SenderNameFull(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ]?.payload?.headers?.from,
        emailAddress
      ),
    [staticShouldUseDraftOrRegular]
  )
  const staticSubject = useMemo(
    () =>
      EmailSubject(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ]?.payload?.headers?.subject
      ),
    [staticShouldUseDraftOrRegular]
  )
  const staticSnippet = useMemo(
    () =>
      EmailSnippet(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ]
      ),
    [staticShouldUseDraftOrRegular]
  )
  const staticHasAttachment = useMemo(
    () => (
      <EmailHasAttachmentSimple
        files={
          staticShouldUseDraftOrRegular.messages![
            staticShouldUseDraftOrRegular.messages!.length - 1
          ]?.payload?.files
        }
      />
    ),
    [staticShouldUseDraftOrRegular]
  )

  const handleOpenEvent = useCallback(() => {
    dispatch(
      openEmail({
        id,
        email: staticShouldUseDraftOrRegular,
      })
    )
  }, [staticShouldUseDraftOrRegular])

  useEffect(() => {
    // This is not triggered in search mode.
    if (EnterKeyListener && isFocused && !inSearch && !activeModal) {
      handleOpenEvent()
    }
  }, [EnterKeyListener, isFocused, inSearch, activeModal])

  const handleCheckBox = (isChecked: boolean) => {
    dispatch(
      setSelectedEmails([
        {
          labelIds,
          id,
          event: isChecked ? 'add' : 'remove',
        },
      ])
    )
  }

  const memoizedEmailListItem = useMemo(
    () => (
      <S.ThreadBase emailLabels={staticEmailLabels} id={id}>
        <S.ThreadRow showLabel={showLabel} isFocused={isFocused}>
          <S.CellCheckbox
            inSelect={
              selectedEmails.selectedIds.length > 0 &&
              selectedEmails.labelIds.length > 0 &&
              multipleIncludes(selectedEmails.labelIds, labelIds)
            }
          >
            <CustomCheckbox
              isChecked={selectedEmails.selectedIds.includes(id)}
              onChange={handleCheckBox}
            />
          </S.CellCheckbox>
          <S.CelUnread>
            {staticEmailLabels.includes(global.UNREAD_LABEL) && <S.UnreadDot />}
          </S.CelUnread>
          <S.CellName onClick={handleOpenEvent} aria-hidden="true">
            <S.Avatars>
              {!labelIds.includes(global.DRAFT_LABEL) ? (
                <ContactCard
                  offset={[30, 10]}
                  userEmail={staticSenderFull}
                  contact={staticSenderPartial}
                >
                  <EmailAvatar userEmail={staticSenderFull} />
                </ContactCard>
              ) : (
                <ContactCard
                  offset={[30, 10]}
                  userEmail={staticRecipientName.name}
                  contact={staticSenderPartial}
                >
                  <EmailAvatar userEmail={staticRecipientName.name} />
                </ContactCard>
              )}
            </S.Avatars>
            {!labelIds.includes(global.DRAFT_LABEL) ? (
              <S.TruncatedSpan
                title={staticSenderPartial.emailAddress}
                data-testid="email-sender"
              >
                {staticSenderPartial.name ?? staticSenderPartial.emailAddress}
              </S.TruncatedSpan>
            ) : (
              <S.TruncatedSpan
                title={staticRecipientName.emailAddress}
                data-testid="email-recipient"
              >
                {staticRecipientName.name}
              </S.TruncatedSpan>
            )}
          </S.CellName>
          {showLabel && (
            <S.CellLabels>
              <EmailLabel labelNames={staticEmailLabels} />
            </S.CellLabels>
          )}
          <S.CellMessage onClick={handleOpenEvent} aria-hidden="true">
            <S.TruncatedDiv>
              {labelIds.includes(global.DRAFT_LABEL) && (
                <span
                  style={{ fontWeight: 'bold', marginRight: '10px' }}
                  data-testid="email-draft-snippet-indicator"
                >
                  {draft.DRAFT_SNIPPET_INDICATOR}
                </span>
              )}
              {email.messages && <MessageCount messages={email.messages} />}
              <span>{staticSubject}</span>
              <Snippet snippet={staticSnippet} />
            </S.TruncatedDiv>
          </S.CellMessage>

          <S.CellAttachment>{staticHasAttachment}</S.CellAttachment>
          <S.CellDate>
            <S.DatePosition>
              <TimeStampDisplay
                threadTimeStamp={getTimeStamp(
                  email,
                  labelIds.includes(global.DRAFT_LABEL)
                )}
              />
            </S.DatePosition>
          </S.CellDate>
          <div />
          <div />
          {!labelIds.includes(global.DRAFT_LABEL) ? (
            <InlineThreadActionsRegular id={id} email={email} />
          ) : (
            <InlineThreadActionsDraft threadId={id} />
          )}
        </S.ThreadRow>
      </S.ThreadBase>
    ),
    [isFocused, selectedEmails, staticEmailLabels]
  )

  return memoizedEmailListItem
}

export default EmailListItem

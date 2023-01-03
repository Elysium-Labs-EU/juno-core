import { useCallback, useEffect, useMemo, useState } from 'react'

import EmailAvatar from 'components/Elements/Avatar/EmailAvatar'
import ContactCard from 'components/Elements/ContactCard/ContactCard'
import EmailHasAttachmentSimple from 'components/Elements/EmailHasAttachmentSimple'
import EmailLabel from 'components/Elements/EmailLabel'
import EmailSnippet from 'components/Elements/EmailSnippet'
import EmailSubject from 'components/Elements/EmailSubject'
import MessageCount from 'components/Elements/MessageCount'
import RecipientName from 'components/Elements/RecipientName'
import SenderNameFull from 'components/Elements/SenderName/senderNameFull'
import SenderNamePartial from 'components/Elements/SenderName/senderNamePartial'
import CustomCheckbox from 'components/Elements/StyledCheckbox/StyledCheckbox'
import getTimeStamp from 'components/Elements/TimeStamp/GetTimeStamp'
import TimeStampDisplay from 'components/Elements/TimeStamp/TimeStampDisplay'
import * as draft from 'constants/draftConstants'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyPress from 'hooks/useKeyPress'
import { selectProfile } from 'store/baseSlice'
import { selectSelectedEmails, setSelectedEmails } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import { openEmail, selectActiveModal, selectInSearch } from 'store/utilsSlice'
import emailLabels from 'utils/emailLabels'
import multipleIncludes from 'utils/multipleIncludes'

import * as S from './EmailListItemStyles'
import InlineThreadActionsDraft from './InlineThreadActionsDraft'
import InlineThreadActionsRegular from './InlineThreadActionsRegular'
import Snippet from './Snippet'

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

const hasUnreadLabel = (emailListThreadItem: IEmailListThreadItem) => {
  const foundLabels: string[] = []
  emailListThreadItem.messages.forEach((message) =>
    message?.labelIds?.forEach((label) => foundLabels.push(label))
  )
  return foundLabels.includes(global.UNREAD_LABEL)
}

const EmailListItem = ({
  activeIndex,
  email,
  index,
  showCheckbox,
  showLabel,
}: {
  activeIndex: number
  email: IEmailListThreadItem
  index: number
  showCheckbox: boolean
  showLabel: boolean
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
            {showCheckbox && (
              <CustomCheckbox
                isChecked={selectedEmails.selectedIds.includes(id)}
                onChange={handleCheckBox}
              />
            )}
          </S.CellCheckbox>
          <S.CelUnread>{hasUnreadLabel(email) && <S.UnreadDot />}</S.CelUnread>
          <S.CellName aria-hidden="true">
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
                onClick={handleOpenEvent}
              >
                {staticSenderPartial.name ?? staticSenderPartial.emailAddress}
              </S.TruncatedSpan>
            ) : (
              <S.TruncatedSpan
                title={staticRecipientName.emailAddress}
                data-testid="email-recipient"
                onClick={handleOpenEvent}
              >
                {staticRecipientName.name}
              </S.TruncatedSpan>
            )}
          </S.CellName>
          {showLabel && (
            <S.CellLabels onClick={handleOpenEvent}>
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
                  labelIds.includes(global.DRAFT_LABEL) || inSearch
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

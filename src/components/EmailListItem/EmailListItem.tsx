import { useCallback, useEffect, useMemo, useState } from 'react'

import EmailHasAttachmentSimple from 'components/Elements/EmailHasAttachmentSimple'
import EmailLabel from 'components/Elements/EmailLabel'
import emailSnippet from 'components/Elements/EmailSnippet'
import emailSubject from 'components/Elements/EmailSubject'
import MessageCount from 'components/Elements/MessageCount'
import recipientName from 'components/Elements/RecipientName'
import senderNameFull from 'components/Elements/SenderName/senderNameFull'
import senderNamePartial from 'components/Elements/SenderName/senderNamePartial'
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
import type { TProfile } from 'store/storeTypes/baseTypes'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import type { TLabelState } from 'store/storeTypes/labelsTypes'
import { openEmail, selectActiveModal, selectInSearch } from 'store/utilsSlice'
import emailLabels from 'utils/emailLabels'
import multipleIncludes from 'utils/multipleIncludes'

import ContactCardAvatar from './ContactCardAvatar'
import * as S from './EmailListItemStyles'
import InlineThreadActionsDraft from './InlineThreadActions/InlineThreadActionsDraft'
import InlineThreadActionsRegular from './InlineThreadActions/InlineThreadActionsRegular'
import SenderRecipientName from './SenderRecipientName'
import Snippet from './Snippet'

// If the user is on Draft list, show only draft emails.

/**
 * @function shouldUseDraftOrRegular
 * @param labelIds - all the label ids stored in Redux
 * @param email - the email list object
 * @returns a filtered version of the emaillist object, if the draft label is found.
 */
const shouldUseDraftOrRegular = (
  labelIds: TLabelState['labelIds'],
  email: TThreadObject
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

const hasUnreadLabel = (emailListThreadItem: TThreadObject) =>
  emailListThreadItem.messages.some((message) =>
    message?.labelIds?.includes(global.UNREAD_LABEL)
  )

interface ExtractEmailData {
  emailAddress: TProfile['emailAddress']
  memoizedDraftOrRegular: TThreadObject
}

export const getRecipientName = ({
  emailAddress,
  memoizedDraftOrRegular,
}: ExtractEmailData) => {
  const lastMessage =
    memoizedDraftOrRegular.messages![
      memoizedDraftOrRegular.messages!.length - 1
    ]
  if (lastMessage) {
    return recipientName(lastMessage?.payload?.headers?.to, emailAddress)
  }
  return null
}
export const getSenderPartial = ({
  emailAddress,
  memoizedDraftOrRegular,
}: ExtractEmailData) => {
  const lastMessage =
    memoizedDraftOrRegular.messages![
      memoizedDraftOrRegular.messages!.length - 1
    ]
  if (lastMessage) {
    return senderNamePartial(lastMessage?.payload?.headers?.from, emailAddress)
  }
  return null
}
export const getSenderFull = ({
  emailAddress,
  memoizedDraftOrRegular,
}: ExtractEmailData) => {
  const lastMessage =
    memoizedDraftOrRegular.messages![
      memoizedDraftOrRegular.messages!.length - 1
    ]
  if (lastMessage) {
    return senderNameFull(lastMessage?.payload?.headers?.from, emailAddress)
  }
  return null
}

const getSubject = ({
  memoizedDraftOrRegular,
}: Pick<ExtractEmailData, 'memoizedDraftOrRegular'>) => {
  const lastMessage =
    memoizedDraftOrRegular.messages![
      memoizedDraftOrRegular.messages!.length - 1
    ]
  if (lastMessage) {
    return emailSubject(lastMessage?.payload?.headers?.subject)
  }
  return null
}
const getSnippet = ({
  memoizedDraftOrRegular,
}: Pick<ExtractEmailData, 'memoizedDraftOrRegular'>) => {
  const lastMessage =
    memoizedDraftOrRegular.messages![
      memoizedDraftOrRegular.messages!.length - 1
    ]
  if (lastMessage) {
    return emailSnippet(lastMessage)
  }
  return null
}

interface IEmailListItem {
  activeIndex: number
  email: TThreadObject
  index: number
  showCheckbox: boolean
  showLabel: boolean
}

const EmailListItem = ({
  activeIndex,
  email,
  index,
  showCheckbox,
  showLabel,
}: IEmailListItem) => {
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

  const memoizedDraftOrRegular = useMemo(
    () => shouldUseDraftOrRegular(labelIds, email),
    [email]
  )

  const memoizedEmailLabels = useMemo(
    () => emailLabels(memoizedDraftOrRegular, storageLabels),
    [memoizedDraftOrRegular, storageLabels]
  )

  const memoizedRecipientName = useMemo(
    () => getRecipientName({ emailAddress, memoizedDraftOrRegular }),
    [emailAddress, memoizedDraftOrRegular]
  )
  const memoizedSenderPartial = useMemo(
    () => getSenderPartial({ emailAddress, memoizedDraftOrRegular }),
    [emailAddress, memoizedDraftOrRegular]
  )
  const memoizedSenderFull = useMemo(
    () => getSenderFull({ emailAddress, memoizedDraftOrRegular }),
    [memoizedDraftOrRegular]
  )

  const memoizedSubject = useMemo(
    () => getSubject({ memoizedDraftOrRegular }),
    [memoizedDraftOrRegular]
  )
  const memoizedSnippet = useMemo(
    () => getSnippet({ memoizedDraftOrRegular }),
    [memoizedDraftOrRegular]
  )

  const memoizedHasAttachment = useMemo(
    () => (
      <EmailHasAttachmentSimple
        files={
          memoizedDraftOrRegular.messages![
            memoizedDraftOrRegular.messages!.length - 1
          ]?.payload?.files
        }
      />
    ),
    [memoizedDraftOrRegular]
  )

  const handleOpenEvent = useCallback(() => {
    dispatch(
      openEmail({
        id,
        email: memoizedDraftOrRegular,
      })
    )
  }, [memoizedDraftOrRegular])

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
      <S.ThreadBase emailLabels={memoizedEmailLabels} id={id}>
        <S.ThreadRow showLabel={showLabel} isFocused={isFocused}>
          {!labelIds.includes(global.DRAFT_LABEL) ? (
            <InlineThreadActionsRegular
              threadId={id}
              email={email}
              isFocused={isFocused}
            />
          ) : (
            <InlineThreadActionsDraft threadId={id} isFocused={isFocused} />
          )}
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
              <ContactCardAvatar
                labelIds={labelIds}
                senderFull={memoizedSenderFull}
                senderPartial={memoizedSenderPartial}
                recipientName={memoizedRecipientName}
              />
            </S.Avatars>
            <SenderRecipientName
              labelIds={labelIds}
              senderFull={memoizedSenderFull}
              senderPartial={memoizedSenderPartial}
              recipientName={memoizedRecipientName}
              handleOpenEvent={handleOpenEvent}
            />
          </S.CellName>
          {showLabel && (
            <S.CellLabels onClick={handleOpenEvent}>
              <EmailLabel labelNames={memoizedEmailLabels} />
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
              <span>{memoizedSubject}</span>
              <Snippet snippet={memoizedSnippet} />
            </S.TruncatedDiv>
          </S.CellMessage>

          <S.CellAttachment>{memoizedHasAttachment}</S.CellAttachment>
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
        </S.ThreadRow>
      </S.ThreadBase>
    ),
    [isFocused, selectedEmails, memoizedEmailLabels]
  )

  return memoizedEmailListItem
}

export default EmailListItem

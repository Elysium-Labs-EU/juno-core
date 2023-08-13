import { useCallback, useEffect, useMemo, useState } from 'react'

import EmailHasAttachmentSimple from 'components/Elements/EmailHasAttachmentSimple'
import EmailLabel from 'components/Elements/EmailLabel'
import MessageCount from 'components/Elements/MessageCount'
import CustomCheckbox from 'components/Elements/StyledCheckbox/StyledCheckbox'
import getTimeStamp from 'components/Elements/TimeStamp/GetTimeStamp'
import TimeStampDisplay from 'components/Elements/TimeStamp/TimeStampDisplay'
import * as global from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import useKeyPress from 'hooks/useKeyPress'
import { selectProfile } from 'store/baseSlice'
import { setViewIndex } from 'store/emailDetailSlice'
import { selectSelectedEmails, setSelectedEmails } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds, selectStorageLabels } from 'store/labelsSlice'
import type { TProfile } from 'store/storeTypes/baseTypes'
import type { TThreadObject } from 'store/storeTypes/emailListTypes'
import { openEmail, selectActiveModal, selectInSearch } from 'store/utilsSlice'
import { Span } from 'styles/globalStyles'
import emailLabels from 'utils/emailLabels'
import multipleIncludes from 'utils/multipleIncludes'

import ContactCardAvatar from './ContactCardAvatar'
import * as S from './EmailListItemStyles'
import InlineThreadActionsRegular from './InlineThreadActions/InlineThreadActionsRegular'
import SenderRecipientName from './SenderRecipientName'
import Snippet from './Snippet'
import getRecipientName from './Utils/getRecipientName'
import getSenderFull from './Utils/getSenderFull'
import getSenderPartial from './Utils/getSenderPartial'
import getSnippet from './Utils/getSnippet'
import getSubject from './Utils/getSubject'
import shouldUseDraftOrRegular from './Utils/shouldUseDraftOrRegular'

const hasUnreadLabel = (emailListThreadItem: TThreadObject) =>
  emailListThreadItem.messages.some((message) =>
    message.labelIds.includes(global.UNREAD_LABEL)
  )

export interface IExtractEmailData {
  emailAddress: TProfile['emailAddress']
  memoizedDraftOrRegular: TThreadObject
}

interface EmailListItemProps {
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
}: EmailListItemProps) => {
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
          memoizedDraftOrRegular.messages[
            memoizedDraftOrRegular.messages.length - 1
          ]?.payload?.files
        }
      />
    ),
    [memoizedDraftOrRegular]
  )

  const handleOpenEvent = useCallback(() => {
    dispatch(setViewIndex(index))
    dispatch(
      openEmail({
        id,
        email: memoizedDraftOrRegular,
      })
    )
  }, [index, memoizedDraftOrRegular])

  useEffect(() => {
    // This is not triggered in search mode.
    if (!activeModal && EnterKeyListener && !inSearch && isFocused) {
      handleOpenEvent()
    }
  }, [activeModal, EnterKeyListener, inSearch, isFocused])

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
          ) :
            null
          }
          <S.CellCheckbox
            inselect={(
              selectedEmails
                ? selectedEmails.selectedIds.length > 0 &&
                selectedEmails.labelIds.length > 0 &&
                multipleIncludes(selectedEmails.labelIds, labelIds)
                : false
            ).toString()}
          >
            {showCheckbox && (
              <CustomCheckbox
                isChecked={
                  selectedEmails
                    ? selectedEmails.selectedIds.includes(id)
                    : false
                }
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
              <EmailLabel labelIds={memoizedEmailLabels} />
            </S.CellLabels>
          )}
          <S.CellMessage onClick={handleOpenEvent} aria-hidden="true">
            <S.TruncatedDiv>
              {labelIds.includes(global.DRAFT_LABEL) && (
                <Span
                  style={{ fontWeight: 'bold', marginRight: '10px' }}
                  data-testid="email-draft-snippet-indicator"
                >
                  {global.DRAFT_SNIPPET_INDICATOR}
                </Span>
              )}
              <MessageCount messages={email.messages} />
              <Span>{memoizedSubject}</Span>
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

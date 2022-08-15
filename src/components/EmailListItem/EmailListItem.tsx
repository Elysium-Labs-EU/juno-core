import { useCallback, useEffect, useMemo, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import EmailAvatar from '../Elements/Avatar/EmailAvatar'
import EmailHasAttachment from '../Elements/EmailHasAttachment'
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
import GetTimeStamp from '../Elements/TimeStamp/GetTimeStamp'
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
import { selectLabelIds } from '../../store/labelsSlice'
import emailLabels from '../../utils/emailLabels'
import {
  selectSelectedEmails,
  setSelectedEmails,
} from '../../store/emailListSlice'
import useKeyPress from '../../hooks/useKeyPress'

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
  const selectedEmails = useAppSelector(selectSelectedEmails)
  const labelIds = useAppSelector(selectLabelIds)
  const { id } = email
  const dispatch = useAppDispatch()
  const EnterKeyListener = useKeyPress(keyConstants.KEY_ENTER)

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
    () => emailLabels(staticShouldUseDraftOrRegular),
    [email]
  )

  const staticRecipientName = useMemo(
    () =>
      RecipientName(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ],
        emailAddress
      ),
    []
  )
  const staticSenderPartial = useMemo(
    () =>
      SenderNamePartial(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ],
        emailAddress
      ),
    []
  )
  const staticSenderFull = useMemo(
    () =>
      SenderNameFull(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ],
        emailAddress
      ),
    []
  )
  const staticSubjectFetch = useMemo(
    () =>
      EmailSubject(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ]
      ),
    []
  )
  const staticSubject =
    staticSubjectFetch.length > 0 ? staticSubjectFetch : global.NO_SUBJECT
  const staticSnippet = useMemo(
    () =>
      EmailSnippet(
        staticShouldUseDraftOrRegular.messages![
          staticShouldUseDraftOrRegular.messages!.length - 1
        ]
      ),
    []
  )

  const handleOpenEvent = useCallback(() => {
    dispatch(
      openEmail({
        id,
        email: staticShouldUseDraftOrRegular,
      })
    )
  }, [])

  useEffect(() => {
    // This is not triggered in search mode.
    if (EnterKeyListener && isFocused && !inSearch && !activeModal) {
      handleOpenEvent()
    }
  }, [EnterKeyListener, isFocused, inSearch, activeModal])

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setSelectedEmails([
        {
          id,
          event: event.target.checked ? 'add' : 'remove',
        },
      ])
    )
  }

  // console.log(email)

  const memoizedEmailListItem = useMemo(
    () => (
      <S.ThreadBase emailLabels={staticEmailLabels}>
        <S.ThreadRow showLabel={showLabel} isFocused={isFocused}>
          <S.CellCheckbox inSelect={selectedEmails.length > 0}>
            <Checkbox
              checked={selectedEmails.includes(id)}
              onChange={handleCheckBox}
              size="small"
            />
          </S.CellCheckbox>
          <S.CelUnread>
            {staticEmailLabels.includes(global.UNREAD_LABEL) && <S.UnreadDot />}
          </S.CelUnread>
          <S.CellName onClick={handleOpenEvent} aria-hidden="true">
            <S.Avatars>
              {!labelIds.includes(global.DRAFT_LABEL) ? (
                <EmailAvatar avatarURL={staticSenderFull} />
              ) : (
                <EmailAvatar avatarURL={staticRecipientName.name} />
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
                  style={{ fontWeight: 'bold' }}
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

          <S.CellAttachment>
            {email.messages && <EmailHasAttachment messages={email.messages} />}
          </S.CellAttachment>
          <S.CellDate>
            <S.DatePosition>
              <TimeStampDisplay threadTimeStamp={GetTimeStamp(email)} />
            </S.DatePosition>
          </S.CellDate>
          <div />
          <div />
          {!labelIds.includes(global.DRAFT_LABEL) ? (
            <InlineThreadActionsRegular id={id} labelIds={labelIds} />
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

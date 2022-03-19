import { memo, useCallback, useMemo } from 'react'
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
import openEmail from '../../utils/openEmail'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { IEmailListThreadItem } from '../../Store/emailListTypes'
import GetTimeStamp from '../Elements/TimeStamp/GetTimeStamp'
import RecipientName from '../Elements/RecipientName'
import SenderNamePartial from '../Elements/SenderName/senderNamePartial'
import SenderNameFull from '../Elements/SenderName/senderNameFull'
import EmailSubject from '../Elements/EmailSubject'
import EmailSnippet from '../Elements/EmailSnippet'
import InlineThreadActionsDraft from './InlineThreadActionsDraft'
import { selectProfile } from '../../Store/baseSlice'
import EmailLabel from '../Elements/EmailLabel'
import { selectInSearch } from '../../Store/utilsSlice'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import emailLabels from '../../utils/emailLabels'
import {
  selectSelectedEmails,
  setSelectedEmails,
} from '../../Store/emailListSlice'

// If the user is on Draft list, show only draft emails.
const shouldUseDraftOrRegular = (
  labelIds: string[],
  email: IEmailListThreadItem
) => {
  if (Array.isArray(labelIds) && labelIds.includes(draft.DRAFT_LABEL)) {
    if (email?.messages) {
      return {
        ...email,
        messages: email.messages.filter((message) =>
          message.labelIds.includes(draft.DRAFT_LABEL)
        ),
      }
    }
    return email
  }
  return email
}

const EmailListItem = memo(
  ({
    email,
    showLabel,
  }: {
    email: IEmailListThreadItem
    showLabel: boolean
  }) => {
    const { emailAddress } = useAppSelector(selectProfile)
    const inSearch = useAppSelector(selectInSearch)
    const selectedEmails = useAppSelector(selectSelectedEmails)
    const storageLabels = useAppSelector(selectStorageLabels)
    const labelIds = useAppSelector(selectLabelIds)
    const { id } = email
    const dispatch = useAppDispatch()

    const staticShouldUseDraftOrRegular = useMemo(
      () => shouldUseDraftOrRegular(labelIds, email),
      []
    )
    const staticEmailLabels = useMemo(
      () => emailLabels(staticShouldUseDraftOrRegular),
      []
    )
    const staticRecipientName = useMemo(
      () =>
        RecipientName(
          staticShouldUseDraftOrRegular.message ||
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
          staticShouldUseDraftOrRegular.message ||
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
          staticShouldUseDraftOrRegular.message ||
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
          staticShouldUseDraftOrRegular.message ||
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
          staticShouldUseDraftOrRegular.message ||
            staticShouldUseDraftOrRegular.messages![
              staticShouldUseDraftOrRegular.messages!.length - 1
            ]
        ),
      []
    )

    const handleClick = useCallback(() => {
      openEmail({
        labelIds,
        id,
        email: staticShouldUseDraftOrRegular,
        dispatch,
        inSearch,
        storageLabels,
      })
    }, [])

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

    return (
      <S.ThreadBase emailLabels={staticEmailLabels}>
        <S.ThreadRow showLabel={showLabel}>
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
          <S.CellName onClick={handleClick} aria-hidden="true">
            <S.Avatars>
              {!labelIds.includes(draft.DRAFT_LABEL) ? (
                <EmailAvatar avatarURL={staticSenderFull} />
              ) : (
                <EmailAvatar avatarURL={staticRecipientName.name} />
              )}
            </S.Avatars>
            {!labelIds.includes(draft.DRAFT_LABEL) ? (
              <S.TruncatedSpan title={staticSenderPartial.emailAddress}>
                {staticSenderPartial.name ?? staticSenderPartial.emailAddress}
              </S.TruncatedSpan>
            ) : (
              <S.TruncatedSpan title={staticRecipientName.emailAddress}>
                {staticRecipientName.name}
              </S.TruncatedSpan>
            )}
            {email.messages && <MessageCount countOfMessage={email.messages} />}
          </S.CellName>
          {showLabel && (
            <S.CellLabels>
              <EmailLabel labelNames={staticEmailLabels} />
            </S.CellLabels>
          )}
          <S.CellMessage onClick={handleClick} aria-hidden="true">
            <S.TruncatedDiv>
              {labelIds.includes(draft.DRAFT_LABEL) && (
                <span style={{ fontWeight: 'bold' }}>
                  {draft.DRAFT_SNIPPET_INDICATOR}
                </span>
              )}
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
          {!labelIds.includes(draft.DRAFT_LABEL) ? (
            <InlineThreadActionsRegular id={id} labelIds={labelIds} />
          ) : (
            <InlineThreadActionsDraft threadId={id} />
          )}
        </S.ThreadRow>
      </S.ThreadBase>
    )
  }
)

export default EmailListItem

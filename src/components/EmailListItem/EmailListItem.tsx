import React, { memo } from 'react'
import { selectLabelIds } from '../../Store/labelsSlice'
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
import { EmailListThreadItem } from '../../Store/emailListTypes'
import GetTimeStamp from '../Elements/TimeStamp/GetTimeStamp'
import RecipientName from '../Elements/RecipientName'
import SenderNamePartial from '../Elements/SenderName/senderNamePartial'
import SenderNameFull from '../Elements/SenderName/senderNameFull'
import EmailSubject from '../Elements/EmailSubject'
import EmailSnippet from '../Elements/EmailSnippet'
import InlineThreadActionsDraft from './InlineThreadActionsDraft'

const EmailListItem = memo(({ email }: { email: EmailListThreadItem }) => {
  const labelIds = useAppSelector(selectLabelIds)
  const { id } = email
  const dispatch = useAppDispatch()

  const emailLabels = () => {
    if (email && email.messages) return email.messages[email.messages.length - 1].labelIds
    if (email && email.message) return email.message.labelIds
    return ''
  }

  const staticEmailLabels = emailLabels()
  const staticRecipientName = RecipientName(email.message || email.messages![email.messages!.length - 1])
  const staticSenderPartial = SenderNamePartial(email.message || email.messages![email.messages!.length - 1])
  const staticSenderFull = SenderNameFull(email.message || email.messages![email.messages!.length - 1])
  const staticSubjectFetch = EmailSubject(email.message || email.messages![email.messages!.length - 1])
  const staticSubject = staticSubjectFetch.length > 0 ? staticSubjectFetch : global.NO_SUBJECT
  const staticSnippet = EmailSnippet(email.message || email.messages![email.messages!.length - 1])

  return (
    <S.ThreadBase key={id} emailLabels={staticEmailLabels}>
      <S.ThreadRow>
        <div />
        <S.CellCheckbox>{
          staticEmailLabels.includes(global.UNREAD_LABEL) && <S.UnreadDot />
        }</S.CellCheckbox>
        <S.CellName
          onClick={() => openEmail({ labelIds, id, email, dispatch })}
          aria-hidden="true"
        >
          <S.Avatars>
            {!labelIds.includes(draft.LABEL) ? (
              <EmailAvatar avatarURL={staticSenderFull} />
            ) : (
              <EmailAvatar avatarURL={staticRecipientName.name} />
            )}
          </S.Avatars>
          {!labelIds.includes(draft.LABEL) ? (
            <span className="text_truncate" title={staticSenderPartial.emailAddress}>{staticSenderPartial.name ?? staticSenderPartial.emailAddress}</span>
          ) : (
            <span className="text_truncate" title={staticRecipientName.emailAddress}>{staticRecipientName.name}</span>
          )}
          {email.messages && <MessageCount countOfMessage={email.messages} />}
        </S.CellName>
        <S.CellMessage
          onClick={() => openEmail({ labelIds, id, email, dispatch })}
          aria-hidden="true"
        >
          <div className="subjectSnippet text_truncate">
            {labelIds.includes(draft.LABEL) && (
              <span style={{ fontWeight: 'bold' }}>{draft.DRAFT_SNIPPET_INDICATOR}</span>
            )}
            <span>{staticSubject}</span>
            <Snippet snippet={staticSnippet} />
          </div>
        </S.CellMessage>

        <S.CellAttachment>
          {email.messages && <EmailHasAttachment messages={email.messages} />}
        </S.CellAttachment>
        <S.CellDate>
          <S.DatePosition>
            <span className="date">
              <TimeStampDisplay threadTimeStamp={GetTimeStamp(email)} />
            </span>
          </S.DatePosition>
        </S.CellDate>
        <div />
        <div />
        {!labelIds.includes(draft.LABEL) ? (
          <InlineThreadActionsRegular id={id} labelIds={labelIds} />
        ) : (
          <InlineThreadActionsDraft threadId={id} />
        )}
      </S.ThreadRow>
    </S.ThreadBase>
  )
})

export default EmailListItem

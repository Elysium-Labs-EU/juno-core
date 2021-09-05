import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectLabelIds } from '../../Store/labelsSlice'
import EmailAvatar from '../EmailAvatar'
import EmailHasAttachment from '../EmailHasAttachment'
import TimeStamp from '../TimeStamp'
import MessageCount from '../MessageCount'
import Snippet from './Snippet'
import InlineThreadActions from './InlineThreadActions'
import * as S from './EmailListItemStyles'
import { findPayloadHeadersData } from '../../utils'
import * as draft from '../../constants/draftConstants'
import openEmail from '../../utils/openEmail'

const EmailListItem = ({ email }) => {
  const labelIds = useSelector(selectLabelIds)
  const { id } = email
  const history = useHistory()
  const dispatch = useDispatch()

  const emailLabels =
    email && email.messages
      ? email.messages[email.messages.length - 1].labelIds
      : email.message.labelIds

  const fromEmail = () => {
    const query = 'From'
    if (email) {
      return findPayloadHeadersData({ email, query })
    }
    return null
  }

  const toEmail = () => {
    const query = 'To'
    if (email) {
      return findPayloadHeadersData({ email, query })
    }
    return null
  }

  const emailSubject = () => {
    const query = 'Subject'
    if (email) {
      return findPayloadHeadersData({ email, query })
    }
    return null
  }

  const emailSnippet =
    email && email.messages
      ? email.messages[email.messages.length - 1].snippet
      : email.message.snippet

  const timeStamp =
    email && email.messages
      ? email.messages[email.messages.length - 1].internalDate
      : email.message.internalDate

  return (
    <S.ThreadBase key={id} emailLabels={emailLabels}>
      <S.ThreadRow>
        <div className="cellGradientLeft" />
        <div className="cellCheckbox" />
        <S.CellName
          onClick={() => openEmail({ labelIds, history, id, email, dispatch })}
          aria-hidden="true"
        >
          <S.Avatars>
            {!labelIds.includes(draft.LABEL) ? (
              <EmailAvatar avatarURL={fromEmail()} />
            ) : (
              <EmailAvatar avatarURL={toEmail()} />
            )}
          </S.Avatars>
          {!labelIds.includes(draft.LABEL) ? (
            <span className="text_truncate">{fromEmail()}</span>
          ) : (
            <span className="text_truncate">{toEmail()}</span>
          )}
          <MessageCount countOfMessage={email?.messages} />
        </S.CellName>
        <S.CellMessage
          onClick={() => openEmail({ labelIds, history, id, email, dispatch })}
          aria-hidden="true"
        >
          <div className="subjectSnippet text_truncate">
            {labelIds.includes(draft.LABEL) && (
              <span style={{ fontWeight: 'bold' }}>
                {draft.DRAFT_SNIPPET_INDICATOR}
              </span>
            )}
            <span>{emailSubject()}</span>
            <Snippet snippet={emailSnippet} />
          </div>
        </S.CellMessage>

        <S.CellAttachment>
          <EmailHasAttachment messages={email?.messages} />
        </S.CellAttachment>
        <S.CellDate>
          <S.DatePosition>
            <span className="date">
              <TimeStamp threadTimeStamp={timeStamp} />
            </span>
          </S.DatePosition>
        </S.CellDate>
        <div />
        <div className="cellGradientRight" />
        <InlineThreadActions id={id} history={history} labelIds={labelIds} />
      </S.ThreadRow>
    </S.ThreadBase>
  )
}

export default EmailListItem

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
import ThreadBase from './EmailListItemStyles'
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
      ? email.messages[0].labelIds
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
    email && email.messages ? email.messages[0].snippet : email.message.snippet
  const timeStamp =
    email && email.messages
      ? email.messages[0].internalDate
      : email.message.internalDate

  return (
    <ThreadBase key={id} labelIds={emailLabels}>
      <div className="threadRow">
        <div className="cellGradientLeft" />
        <div className="cellCheckbox" />
        <div
          className="cellName"
          onClick={() => openEmail({ labelIds, history, id, email, dispatch })}
          aria-hidden="true"
        >
          <div className="avatars">
            {!labelIds.includes(draft.LABEL) ? (
              <EmailAvatar avatarURL={fromEmail()} />
            ) : (
              <EmailAvatar avatarURL={toEmail()} />
            )}
          </div>
          {!labelIds.includes(draft.LABEL) ? (
            <span className="text_truncate">{fromEmail()}</span>
          ) : (
            <span className="text_truncate">{toEmail()}</span>
          )}
          <MessageCount countOfMessage={email?.messages} />
        </div>
        <div
          className="cellMessage"
          onClick={() => openEmail({ labelIds, history, id, email, dispatch })}
          aria-hidden="true"
        >
          <div className="subjectSnippet text_truncate">
            <span className="subject">{emailSubject()}</span>
            <Snippet snippet={emailSnippet} />
          </div>
        </div>

        <div className="cellAttachment">
          <EmailHasAttachment messages={email?.messages} />
        </div>
        <div className="cellDate">
          <div className="datePosition">
            <span className="date">
              <TimeStamp threadTimeStamp={timeStamp} />
            </span>
          </div>
        </div>
        <div />
        <div className="cellGradientRight" />
        <InlineThreadActions id={id} history={history} labelIds={labelIds} />
      </div>
    </ThreadBase>
  )
}

export default EmailListItem

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
import { convertArrayToString, findPayloadHeadersData } from '../../utils'
import { OpenDraftEmail } from '../../Store/draftsSlice'

const DRAFT_LABEL = ['DRAFT']

const EmailListItem = ({ email }) => {
  const labelIds = useSelector(selectLabelIds)
  const { id } = email
  const history = useHistory()
  const dispatch = useDispatch()

  console.log(email)

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

  const handleClick = () => {
    const labelURL = convertArrayToString(labelIds)
    if (!labelIds.includes(...DRAFT_LABEL)) {
      history.push(`mail/${labelURL}/${id}`)
    } else {
      email.messages.length > 1 && history.push(`mail/${labelURL}/${id}`)
      email.messages.length === 1 &&
        dispatch(OpenDraftEmail({ history, id, DRAFT_LABEL }))
    }
  }

  return (
    <ThreadBase key={id} labelIds={emailLabels}>
      <div className="threadRow">
        <div className="cellGradientLeft" />
        <div className="cellCheckbox" />
        <div
          className="cellName"
          onClick={() => handleClick(id)}
          aria-hidden="true"
        >
          <div className="avatars">
            {!labelIds.includes(...DRAFT_LABEL) && (
              <EmailAvatar avatarURL={fromEmail()} />
            )}
            {labelIds.includes(...DRAFT_LABEL) && (
              <EmailAvatar avatarURL={toEmail()} />
            )}
          </div>
          {!labelIds.includes(...DRAFT_LABEL) && (
            <span className="text-truncate">{fromEmail()}</span>
          )}
          {labelIds.includes(...DRAFT_LABEL) && (
            <span className="text-truncate">{toEmail()}</span>
          )}
          <MessageCount countOfMessage={email} />
        </div>
        <div
          className="cellMessage"
          onClick={() => handleClick(id)}
          aria-hidden="true"
        >
          <div className="subjectSnippet text-truncate">
            <span className="subject">{emailSubject()}</span>
            <Snippet snippet={emailSnippet} />
          </div>
        </div>

        <div className="cellAttachment">
          {/* <EmailHasAttachment hasAttachment={messages} /> */}
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
        <InlineThreadActions messageId={id} />
      </div>
    </ThreadBase>
  )
}

export default EmailListItem

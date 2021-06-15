import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import EmailAvatar from '../EmailAvatar'
import EmailHasAttachment from '../EmailHasAttachment'
import TimeStamp from '../TimeStamp'
import MessageCount from '../MessageCount'
import Snippet from './Snippet'
import InlineThreadActions from './InlineThreadActions'
import ThreadBase from './EmailListItemStyles'
import { convertArrayToString } from '../../utils'
import { OpenDraftEmail } from '../../Store/actions'

const DRAFT_LABEL = ['DRAFT']

const mapStateToProps = (state) => {
  const { labelIds } = state
  return { labelIds }
}

const EmailListItem = ({ email, labelIds, dispatch }) => {
  const { id } = email
  const history = useHistory()

  const emailLabels = email && email.messages[0].labelIds
  const fromEmail =
    email &&
    email.messages[0].payload.headers.find((data) => data.name === 'From')
      ? email.messages[0].payload.headers.find((data) => data.name === 'From')
          .value
      : undefined
  const toEmail =
    email &&
    email.messages[0].payload.headers.find((data) => data.name === 'To')
      ? email.messages[0].payload.headers.find((data) => data.name === 'To')
          .value
      : 'Draft'
  const emailSubject =
    email &&
    email.messages[0].payload.headers.find((data) => data.name === 'Subject')
      ? email.messages[0].payload.headers.find(
          (data) => data.name === 'Subject'
        ).value
      : '(no subject)'
  const emailSnippet = email && email.messages[0].snippet
  const timeStamp = email && email.messages[0].internalDate

  const handleClick = () => {
    if (!labelIds.includes(...DRAFT_LABEL)) {
      const labelURL = convertArrayToString(labelIds)
      history.push(`mail/${labelURL}/${id}`)
    } else {
      dispatch(OpenDraftEmail({ history, id, DRAFT_LABEL }))
    }
  }

  return (
    <ThreadBase key={id} labelIds={emailLabels}>
      <div className="threadRow">
        <div className="cellGradientLeft" />
        <div className="cellCheckbox" />
        <div className="cellName" onClick={() => handleClick(id)}>
          <div className="avatars">
            {!labelIds.includes(...DRAFT_LABEL) && (
              <EmailAvatar avatarURL={fromEmail} />
            )}
            {labelIds.includes(...DRAFT_LABEL) && (
              <EmailAvatar avatarURL={toEmail} />
            )}
          </div>
          {!labelIds.includes(...DRAFT_LABEL) && (
            <span className="text-truncate">{fromEmail}</span>
          )}
          {labelIds.includes(...DRAFT_LABEL) && (
            <span className="text-truncate">{toEmail}</span>
          )}
          <MessageCount countOfMessage={email} />
        </div>
        <div className="cellMessage" onClick={() => handleClick(id)}>
          <div className="subjectSnippet text-truncate">
            <span className="subject">{emailSubject}</span>
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

export default connect(mapStateToProps)(EmailListItem)

import React from 'react'
import { useHistory } from 'react-router-dom'
import EmailAvatar from '../EmailAvatar'
import EmailHasAttachment from '../EmailHasAttachment'
import TimeStamp from '../TimeStamp'
import MessageCount from '../MessageCount'
import Snippet from './Snippet'
import InlineThreadActions from './InlineThreadActions'
import { connect } from 'react-redux'
import { ThreadBase } from './EmailListItemStyles'
import { convertArrayToString } from './../../utils'

const DRAFT_LABEL = ['DRAFT']

const mapStateToProps = (state) => {
  const { labelIds } = state
  return { labelIds }
}

const EmailListItem = ({ email, labelIds }) => {
  // const {
  //   thread,
  //   thread: { id, messages },
  // } = email
  const { id } = email
  const history = useHistory()

  // const LatestEmail =
  //   thread !== undefined && messages !== undefined ? messages.slice(-1) : thread

  // const emailLabels = Array.isArray(LatestEmail)
  //   ? LatestEmail[0].labelIds[0]
  //   : LatestEmail.labelIds[0]
  // const fromEmail = Array.isArray(LatestEmail)
  //   ? LatestEmail[0].payload.headers.find((data) => data.name === 'From')
  //     ? LatestEmail[0].payload.headers.find((data) => data.name === 'From')
  //         .value
  //     : undefined
  //   : LatestEmail.payload.headers.find((data) => data.name === 'From').value
  // const toEmail = Array.isArray(LatestEmail)
  //   ? LatestEmail[0].payload.headers.find((data) => data.name === 'To')
  //     ? LatestEmail[0].payload.headers.find((data) => data.name === 'To').value
  //     : 'Draft'
  //   : LatestEmail.payload.headers.find((data) => data.name === 'From').value
  // const emailSubject = Array.isArray(LatestEmail)
  //   ? LatestEmail[0].payload.headers.find((data) => data.name === 'Subject')
  //     ? LatestEmail[0].payload.headers.find((data) => data.name === 'Subject')
  //         .value
  //     : '(no subject)'
  //   : LatestEmail.payload.headers.find((data) => data.name === 'Subject').value
  // const emailSnippet = Array.isArray(LatestEmail)
  //   ? LatestEmail[0].snippet
  //   : LatestEmail.snippet
  // const timeStamp = Array.isArray(LatestEmail)
  //   ? LatestEmail[0].internalDate
  //   : LatestEmail.internalDate
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

  const handleClick = (id) => {
    // if (!labelIds.includes(...DRAFT_LABEL)) {
    const labelURL = convertArrayToString(labelIds)
    history.push(`mail/${labelURL}/${id}`)
    // } else {
    //   console.log('Open compose')
    // }
  }

  return (
    <ThreadBase key={id} labelIds={emailLabels}>
      <div className="threadRow">
        <div className="cellGradientLeft"></div>
        <div className="cellCheckbox"></div>
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
        <div></div>
        <div className="cellGradientRight"></div>
        <InlineThreadActions messageId={id} />
      </div>
    </ThreadBase>
  )
}

export default connect(mapStateToProps)(EmailListItem)

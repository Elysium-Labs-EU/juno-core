import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import EmailAvatar from '../../EmailAvatar'
import TimeStamp from '../../TimeStamp'
import { OpenDraftEmail } from '../../../Store/draftsSlice'

const DRAFT_LABEL = ['DRAFT']
const DRAFT = 'Draft - '

const DraftMessage = ({ message, threadDetail }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useSelector((state) => state.currEmail)
  const emailList = useSelector((state) => state.emailList)
  const messageId = message && message.id

  //   console.log(id)

  const AvatarURL =
    message && message.payload.headers.find((e) => e.name === 'From').value

  const From =
    message && message.payload.headers.find((e) => e.name === 'From').value

  const EmailSnippet =
    message && `${message.snippet.replace(/^(.{65}[^\s]*).*/, '$1')}` + `...`

  const handleClick = () => {
    console.log(emailList)
    console.log(id)
    console.log(threadDetail)
    // const selectIndex = threadDetail.messages.findIndex(
    //   (element) => element.id === id
    // )
    dispatch(
      OpenDraftEmail({ history, id, DRAFT_LABEL, threadDetail, messageId })
    )
  }

  return (
    <div
      className="d-flex align-items-center closed-message"
      onClick={handleClick}
      aria-hidden="true"
    >
      <div className="d-flex align-content-center">
        <EmailAvatar avatarURL={AvatarURL} />
        <div className="d-flex align-items-center ml-2 mt-2">
          <div className="text-truncate email-detail-from">
            <span>{From}</span>
          </div>
        </div>
      </div>
      <span style={{ fontStyle: 'italic' }}>
        {DRAFT}
        {EmailSnippet}
      </span>
      <TimeStamp threadTimeStamp={message.internalDate} />
    </div>
  )
}

export default DraftMessage

import React, { useState } from 'react'
import './../../App.scss'
import styled from 'styled-components'
import {
  FiArchive,
  FiCheckCircle,
  FiCornerUpLeft,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import ArchiveMail from './../EmailOptions/ArchiveMail'
import SetToDoMail from './../EmailOptions/SetToDoMail'
import EmailMoreOptions from './../EmailMoreOptions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { convertArrayToString } from '../../utils'

const EmailOptionsContainer = styled.div`
  position: relative;
  padding: 30px;
`
const StickyOptions = styled.div`
  position: sticky;
  top: 122px;
`

const InnerOptionsContainer = styled.div`
  width: 110px;
`

const REPLY_BUTTON = 'Reply'
const TODO_BUTTON = 'To do'
const REMIND_BUTTON = 'Remind'
const ARCHIVE_BUTTON = 'Archive'
const MORE_BUTTON = 'More'

const mapStateToProps = (state) => {
  const { storageLabels, labelIds, emailList, viewIndex } = state
  return { storageLabels, labelIds, emailList, viewIndex }
}

const EmailDetOptions = ({ messageId, storageLabels, labelIds, emailList, viewIndex }) => {
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)
  const [showMenu, setShowMenu] = useState(false)

  return (
    // <img className="avatar avatar-xs rounded-circle" src={item.image} alt={item.nameSurname} />
    <EmailOptionsContainer>
      <StickyOptions>
        <InnerOptionsContainer>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiCornerUpLeft />
              </div>
              <div className="labelContainer">{REPLY_BUTTON}</div>
            </button>
          </div>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiCheckCircle />
              </div>
              <div onClick={() =>
                  SetToDoMail({
                    storageLabels,
                    messageId,
                    history,
                    labelURL,
                    emailList,
                    viewIndex}
                  )
                }
                className="labelContainer">{TODO_BUTTON}</div>
            </button>
          </div>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiClock />
              </div>
              <div className="labelContainer">{REMIND_BUTTON}</div>
            </button>
          </div>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiArchive />
              </div>
              <div
                onClick={() =>
                  ArchiveMail({
                    messageId,
                    history,
                    labelURL,
                    emailList,
                    viewIndex}
                  )
                }
                className="labelContainer"
              >
                {ARCHIVE_BUTTON}
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              type="button"
              className="btn option-link d-flex"
            >
              <div className="icon">
                <FiMoreHorizontal />
              </div>
              <div className="labelContainer">{MORE_BUTTON}</div>
            </button>
          </div>
          {showMenu && <EmailMoreOptions messageId={messageId} />}
        </InnerOptionsContainer>
      </StickyOptions>
    </EmailOptionsContainer>
  )
}

export default connect(mapStateToProps)(EmailDetOptions)

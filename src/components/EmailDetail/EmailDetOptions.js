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
import EmailMoreOptions from './../EmailMoreOptions'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { convertArrayToString, FindLabel } from '../../utils'
import { UpdateMailLabel } from './../../Store/actions'

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
const MARK_AS_DONE_BUTTON = 'Completed'
const REMIND_BUTTON = 'Remind'
const ARCHIVE_BUTTON = 'Archive'
const MORE_BUTTON = 'More'

const mapStateToProps = (state) => {
  const { storageLabels, labelIds, emailList, metaList, viewIndex } = state
  return { storageLabels, labelIds, emailList, metaList, viewIndex }
}

const EmailDetOptions = ({
  messageId,
  storageLabels,
  labelIds,
  emailList,
  metaList,
  viewIndex,
  dispatch,
}) => {
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)
  const [showMenu, setShowMenu] = useState(false)

  const ToDoAction = () => {
    const toDoLabel = FindLabel({ storageLabels, LABEL_NAME: 'Juno/To Do' })
    const request = {
      removeLabelIds: labelIds,
      addLabelIds: [toDoLabel[0].id],
    }
    dispatch(UpdateMailLabel({ messageId, request, history, labelURL }))
  }

  const CompletedAction = () => {
    const request = {
      removeLabelIds: labelIds,
    }
    dispatch(UpdateMailLabel({ messageId, request, history, labelURL }))
  }

  if (
    labelIds.some(
      (item) =>
        item.id === FindLabel({ storageLabels, LABEL_NAME: 'Juno/To Do' }).id
    )
  ) {
  }

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
            {labelIds.some(
              (item) =>
                item.id ===
                FindLabel({ storageLabels, LABEL_NAME: 'Juno/To Do' }).id
            ) ? (
              <button type="button" className="btn option-link d-flex">
                <div className="icon">
                  <FiCheckCircle />
                </div>
                <div onClick={CompletedAction} className="labelContainer">
                  {MARK_AS_DONE_BUTTON}
                </div>
              </button>
            ) : (
              <button type="button" className="btn option-link d-flex">
                <div className="icon">
                  <FiCheckCircle />
                </div>
                <div onClick={ToDoAction} className="labelContainer">
                  {TODO_BUTTON}
                </div>
              </button>
            )}
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
                    viewIndex,
                  })
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

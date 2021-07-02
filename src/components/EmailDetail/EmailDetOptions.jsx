import React, { useState } from 'react'
import '../../App.scss'
import {
  FiArchive,
  FiCheckCircle,
  FiCornerUpLeft,
  FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailMoreOptions'
import { convertArrayToString, FindLabel } from '../../utils'
import { UpdateMetaListLabel } from '../../Store/metaListSlice'
import { selectEmailList } from '../../Store/emailListSlice'
import { selectViewIndex } from '../../Store/emailDetailSlice'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import * as local from '../../constants/emailDetailConstants'
import * as todo from '../../constants/todoConstants'
import * as S from './EmailDetailStyles'

const EmailDetOptions = ({ messageId }) => {
  const emailList = useSelector(selectEmailList)
  const labelIds = useSelector(selectLabelIds)
  const storageLabels = useSelector(selectStorageLabels)
  const viewIndex = useSelector(selectViewIndex)
  const dispatch = useDispatch()
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)
  const [showMenu, setShowMenu] = useState(false)

  const ToDoAction = () => {
    const toDoLabel = FindLabel({ storageLabels, LABEL_NAME: todo.LABEL })
    const request = {
      removeLabelIds: labelIds,
      addLabelIds: [toDoLabel[0].id],
    }
    dispatch(UpdateMetaListLabel({ messageId, request, history, labelURL }))
  }

  const CompletedAction = () => {
    const request = {
      removeLabelIds: labelIds,
    }
    dispatch(UpdateMetaListLabel({ messageId, request, history, labelURL }))
  }

  return (
    <S.EmailOptionsContainer>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiCornerUpLeft />
              </div>
              <div className="labelContainer">{local.BUTTON_REPLY}</div>
            </button>
          </div>
          <div>
            {labelIds.some(
              (item) =>
                item ===
                FindLabel({
                  storageLabels,
                  LABEL_NAME: todo.LABEL,
                })[0].id
            ) ? (
              <button
                type="button"
                className="btn option-link d-flex"
                onClick={CompletedAction}
              >
                <div className="icon">
                  <FiCheckCircle />
                </div>
                <div className="labelContainer">
                  {local.BUTTON_MARK_AS_DONE}
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="btn option-link d-flex"
                onClick={ToDoAction}
              >
                <div className="icon">
                  <FiCheckCircle />
                </div>
                <div className="labelContainer">{local.BUTTON_TODO}</div>
              </button>
            )}
          </div>
          <div>
            <button type="button" className="btn option-link d-flex">
              <div className="icon">
                <FiClock />
              </div>
              <div className="labelContainer">{local.BUTTON_REMIND}</div>
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn option-link d-flex"
              onClick={() =>
                ArchiveMail({
                  messageId,
                  history,
                  labelURL,
                  emailList,
                  viewIndex,
                })
              }
            >
              <div className="icon">
                <FiArchive />
              </div>
              <div className="labelContainer">{local.BUTTON_ARCHIVE}</div>
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
              <div className="labelContainer">{local.BUTTON_MORE}</div>
            </button>
          </div>
          {showMenu && <EmailMoreOptions messageId={messageId} />}
        </S.InnerOptionsContainer>
      </S.StickyOptions>
    </S.EmailOptionsContainer>
  )
}

export default EmailDetOptions

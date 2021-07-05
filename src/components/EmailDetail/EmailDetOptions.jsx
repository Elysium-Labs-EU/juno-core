import React, { useState } from 'react'
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
import {
  selectEmailList,
  selectIsFocused,
  selectIsSorting,
} from '../../Store/emailListSlice'
import { selectViewIndex } from '../../Store/emailDetailSlice'
import { selectLabelIds, selectStorageLabels } from '../../Store/labelsSlice'
import * as local from '../../constants/emailDetailConstants'
import * as todo from '../../constants/todoConstants'
import * as S from './EmailDetailStyles'
import { CustomButtonText } from '../Elements/Buttons'
// import SetCompletedMail from '../EmailOptions/SetCompletedMail'
// import SetToDoMail from '../EmailOptions/SetToDoMail'
// import useEmailComplete from '../../Hooks/useEmailComplete'

const EmailDetOptions = ({ messageId }) => {
  const emailList = useSelector(selectEmailList)
  const isFocused = useSelector(selectIsFocused)
  const isSorting = useSelector(selectIsSorting)
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
            <CustomButtonText
              className="button option-link"
              icon={<FiCornerUpLeft />}
              label={local.BUTTON_REPLY}
            />
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
              <CustomButtonText
                className="button option-link"
                icon={<FiCheckCircle />}
                onClick={() =>
                  CompletedAction({ history, messageId, labelURL, labelIds })
                }
                label={local.BUTTON_MARK_AS_DONE}
              />
            ) : (
              <CustomButtonText
                className="button option-link"
                icon={<FiCheckCircle />}
                onClick={() => ToDoAction({ history, messageId, labelURL })}
                label={local.BUTTON_TODO}
              />
            )}
          </div>
          <div>
            <CustomButtonText
              className="button option-link"
              icon={<FiClock />}
              // onClick={ToDoAction}
              label={local.BUTTON_REMIND}
            />
          </div>
          <div>
            <CustomButtonText
              className="button option-link"
              icon={<FiArchive />}
              onClick={() =>
                ArchiveMail({
                  messageId,
                  history,
                  labelURL,
                  emailList,
                  viewIndex,
                })
              }
              label={local.BUTTON_ARCHIVE}
            />
          </div>
          <div>
            <CustomButtonText
              className="button option-link"
              icon={<FiMoreHorizontal />}
              onClick={() => setShowMenu(!showMenu)}
              label={local.BUTTON_MORE}
            />
          </div>
          {showMenu && <EmailMoreOptions messageId={messageId} />}
        </S.InnerOptionsContainer>
      </S.StickyOptions>
    </S.EmailOptionsContainer>
  )
}

export default EmailDetOptions

import React, { useEffect, useState } from 'react'
import {
  FiArchive,
  FiCheckCircle,
  FiCornerUpLeft,
  // FiClock,
  FiMoreHorizontal,
} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ArchiveMail from '../../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../../EmailMoreOptions'
import { convertArrayToString, FindLabelByName } from '../../../utils'
import {
  selectEmailList,
  // selectIsFocused,
  // selectIsSorting,
} from '../../../Store/emailListSlice'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as todo from '../../../constants/todoConstants'
import * as S from '../EmailDetailStyles'
import { CustomButtonText } from '../../Elements/Buttons'
import SetCompletedMail from '../../EmailOptions/SetCompletedMail'
import SetToDoMail from '../../EmailOptions/SetToDoMail'

const EmailDetOptions = ({ messageId, setReply }) => {
  const emailList = useSelector(selectEmailList)
  // const isFocused = useSelector(selectIsFocused)
  // const isSorting = useSelector(selectIsSorting)
  const labelIds = useSelector(selectLabelIds)
  const storageLabels = useSelector(selectStorageLabels)
  const dispatch = useDispatch()
  const history = useHistory()
  const labelURL = convertArrayToString(labelIds)
  const [showMenu, setShowMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setShowMenu(false)
  }, [location])

  return (
    <S.EmailOptionsContainer>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          <div>
            <CustomButtonText
              className="button option-link"
              icon={<FiCornerUpLeft />}
              label={local.BUTTON_REPLY}
              onClick={setReply}
            />
          </div>
          <div>
            {labelIds &&
            labelIds.some(
              (item) =>
                item ===
                FindLabelByName({
                  storageLabels,
                  LABEL_NAME: todo.LABEL,
                })[0].id
            ) ? (
              <CustomButtonText
                className="button option-link"
                icon={<FiCheckCircle />}
                onClick={() =>
                  SetCompletedMail({
                    messageId,
                    history,
                    labelURL,
                    labelIds,
                    dispatch,
                    location,
                  })
                }
                label={local.BUTTON_MARK_AS_DONE}
              />
            ) : (
              <CustomButtonText
                className="button option-link"
                icon={<FiCheckCircle />}
                onClick={() =>
                  SetToDoMail({
                    history,
                    messageId,
                    labelURL,
                    labelIds,
                    dispatch,
                    location,
                    storageLabels,
                  })
                }
                label={local.BUTTON_TODO}
              />
            )}
          </div>
          <div>
            {/* <CustomButtonText
              className="button option-link"
              icon={<FiClock />}
              // onClick={ToDoAction}
              label={local.BUTTON_REMIND}
            /> */}
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
                  labelIds,
                  location,
                  dispatch,
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
          {showMenu && (
            <EmailMoreOptions
              messageId={messageId}
              labelURL={labelURL}
              labelIds={labelIds}
            />
          )}
        </S.InnerOptionsContainer>
      </S.StickyOptions>
    </S.EmailOptionsContainer>
  )
}

export default EmailDetOptions

import React, { useEffect, useState } from 'react'
import {
  FiArchive,
  FiCheckCircle,
  FiCornerUpLeft,
  FiMoreHorizontal,
} from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import ArchiveMail from '../../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../MoreOptions/EmailMoreOptions'
import { FindLabelByName } from '../../../utils/findLabel'
import { selectLabelIds, selectStorageLabels } from '../../../Store/labelsSlice'
import * as local from '../../../constants/emailDetailConstants'
import * as todo from '../../../constants/todoConstants'
import * as S from '../EmailDetailStyles'
import { CustomButtonText } from '../../Elements/Buttons'
import SetToDoMail from '../../EmailOptions/SetToDoMail'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { LocationObjectType } from '../../types/globalTypes'

const messageIndex = 0

interface IEmailDetailOptions {
  messageId: string
  isReplyingListener: Function
  threadId: string
}

const EmailDetailOptions = ({ messageId, isReplyingListener, threadId }: IEmailDetailOptions) => {
  const labelIds = useAppSelector(selectLabelIds)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const location = useLocation<LocationObjectType>()

  useEffect(() => {
    setShowMenu(false)
  }, [location])

  return (
    <S.EmailOptionsContainer>
      <S.StickyOptions>
        <S.InnerOptionsContainer>
          <div>
            <CustomButtonText
              className="juno-button option-link"
              icon={<FiCornerUpLeft />}
              label={local.BUTTON_REPLY}
              onClick={() => isReplyingListener({ threadId, messageIndex })}
            />
          </div>
          <div>
            {labelIds &&
              !labelIds.some(
                (item) =>
                  item ===
                  FindLabelByName({
                    storageLabels,
                    LABEL_NAME: todo.LABEL,
                  })[0].id
              ) && (
                <CustomButtonText
                  className="juno-button option-link"
                  icon={<FiCheckCircle />}
                  onClick={() =>
                    SetToDoMail({
                      messageId,
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
            <CustomButtonText
              className="juno-button option-link"
              icon={<FiArchive />}
              onClick={() =>
                ArchiveMail({
                  messageId,
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
              className="juno-button option-link"
              icon={<FiMoreHorizontal />}
              onClick={() => setShowMenu(!showMenu)}
              label={local.BUTTON_MORE}
            />
          </div>
          {showMenu && <EmailMoreOptions messageId={messageId} labelIds={labelIds} storageLabels={storageLabels} />}
        </S.InnerOptionsContainer>
      </S.StickyOptions>
    </S.EmailOptionsContainer>
  )
}

export default EmailDetailOptions

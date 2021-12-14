import React, { useState } from 'react'
import { FiArchive, FiCheckCircle, FiCornerUpLeft, FiMoreHorizontal } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailDetail/MoreOptions/EmailMoreOptions'
import * as S from './InlineThreadActionsStyles'
import * as todo from '../../constants/todoConstants'
import { CustomIconLink } from '../Elements/Buttons'
import ReplyOverview from '../EmailOptions/ReplyOverview'
import SetToDoMail from '../EmailOptions/SetToDoMail'
import { FindLabelByName } from '../../utils/findLabel'
import { selectStorageLabels } from '../../Store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { LocationObjectType } from '../types/globalTypes'

const InlineThreadActionsRegular = ({
  id,
  labelIds,
}: {
  id: string
  labelIds: string[]
}) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()
  const location = useLocation<LocationObjectType>()
  const messageId = id && id

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconLink
          className="button button-small text_muted option-link"
          icon={<FiCornerUpLeft />}
          onClick={() => ReplyOverview({ labelIds, id, dispatch })}
          title="Reply"
        />
        {/* <CustomIconLink
          className="button button-small text_muted option-link"
          icon={<FiClock />}
        /> */}
        {labelIds &&
          !labelIds.some(
            (item) =>
              item ===
              FindLabelByName({
                storageLabels,
                LABEL_NAME: todo.LABEL,
              })[0].id
          ) && (
            <CustomIconLink
              onClick={() =>
                SetToDoMail({
                  messageId,
                  labelIds,
                  dispatch,
                  location,
                  storageLabels,
                })
              }
              className="button button-small text_muted option-link"
              icon={<FiCheckCircle />}
              title="Mark as To Do"
            />
          )}
        <CustomIconLink
          onClick={() => ArchiveMail({ messageId, location, dispatch, labelIds })}
          className="button button-small text_muted option-link"
          icon={<FiArchive />}
          title="Archive"
        />
        <CustomIconLink
          onClick={() => setShowMenu(!showMenu)}
          className="button button-small text_muted option-link"
          icon={<FiMoreHorizontal />}
        />
      </S.Inner>
      {showMenu && <EmailMoreOptions messageId={id} labelIds={labelIds} />}
    </S.Wrapper>
  )
}

export default InlineThreadActionsRegular

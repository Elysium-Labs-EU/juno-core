import React, { useState } from 'react'
import { FiArchive, FiCheckCircle, FiCornerUpLeft, FiMoreHorizontal } from 'react-icons/fi'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import EmailMoreOptions from '../EmailDetail/MoreOptions/EmailMoreOptions'
import * as S from './InlineThreadActionsStyles'
import * as todo from '../../constants/todoConstants'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import ReplyOverview from '../EmailOptions/ReplyOverview'
import SetToDoMail from '../EmailOptions/SetToDoMail'
import { FindLabelByName } from '../../utils/findLabel'
import { selectStorageLabels } from '../../Store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectIsSearching } from '../../Store/utilsSlice'

interface IInlineThreadActionsRegular {
  id: string
  labelIds: string[]
}

const InlineThreadActionsRegular = ({ id, labelIds }: IInlineThreadActionsRegular) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isSearching = useAppSelector(selectIsSearching)
  const dispatch = useAppDispatch()

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconButton
          className="juno-button juno-button-small text_muted option-link"
          icon={<FiCornerUpLeft />}
          onClick={() => ReplyOverview({ labelIds, id, dispatch, isSearching, storageLabels })}
          title="Reply"
          type="button"
        />
        {labelIds &&
          !labelIds.some(
            (item) =>
              item ===
              FindLabelByName({
                storageLabels,
                LABEL_NAME: todo.LABEL,
              })[0].id
          ) && (
            <CustomIconButton
              onClick={() =>
                SetToDoMail({
                  messageId: id,
                  labelIds,
                  dispatch,
                  storageLabels,
                })
              }
              className="juno-button juno-button-small text_muted option-link"
              icon={<FiCheckCircle />}
              title="Mark as To Do"
              type="button"
            />
          )}
        <CustomIconButton
          onClick={() => ArchiveMail({ messageId: id, dispatch, labelIds })}
          className="juno-button juno-button-small text_muted option-link"
          icon={<FiArchive />}
          title="Archive"
          type="button"
        />
        <CustomIconButton
          onClick={() => setShowMenu(!showMenu)}
          className="juno-button juno-button-small text_muted option-link"
          icon={<FiMoreHorizontal />}
          type="button"
        />
      </S.Inner>
      {showMenu && <EmailMoreOptions messageId={id} labelIds={labelIds} storageLabels={storageLabels} />}
    </S.Wrapper>
  )
}

export default InlineThreadActionsRegular

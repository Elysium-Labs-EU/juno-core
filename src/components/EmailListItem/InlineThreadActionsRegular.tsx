import { useState } from 'react'
import {
  FiArchive,
  FiCheckCircle,
  FiCornerUpLeft,
  FiMoreHorizontal,
} from 'react-icons/fi'
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

const SIZE = 16

const InlineThreadActionsRegular = ({
  id,
  labelIds,
}: IInlineThreadActionsRegular) => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const storageLabels = useAppSelector(selectStorageLabels)
  const isSearching = useAppSelector(selectIsSearching)
  const dispatch = useAppDispatch()

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconButton
          icon={<FiCornerUpLeft size={SIZE} />}
          onClick={() =>
            ReplyOverview({
              labelIds,
              id,
              dispatch,
              isSearching,
              storageLabels,
            })
          }
          title="Reply"
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
              icon={<FiCheckCircle size={SIZE} />}
              title="Mark as To Do"
            />
          )}
        <CustomIconButton
          onClick={() => ArchiveMail({ messageId: id, dispatch, labelIds })}
          icon={<FiArchive size={SIZE} />}
          title="Archive"
        />
        <CustomIconButton
          onClick={() => setShowMenu(!showMenu)}
          icon={<FiMoreHorizontal size={SIZE} />}
        />
      </S.Inner>
      {showMenu && <EmailMoreOptions messageId={id} />}
    </S.Wrapper>
  )
}

export default InlineThreadActionsRegular

import { FiArchive, FiCheckCircle, FiCornerUpLeft } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import ArchiveMail from '../EmailOptions/ArchiveMail'
import * as S from './InlineThreadActionsStyles'
import * as todo from '../../constants/todoConstants'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import ReplyOverview from '../EmailOptions/ReplyOverview'
import SetToDoMail from '../EmailOptions/SetToDoMail'
import { FindLabelByName } from '../../utils/findLabel'
import { selectStorageLabels } from '../../Store/labelsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import thrashMail from '../EmailOptions/ThrashMail'
import * as themeConstants from '../../constants/themeConstants'

interface IInlineThreadActionsRegular {
  id: string
  labelIds: string[]
}

const SIZE = 16

const InlineThreadActionsRegular = ({
  id,
  labelIds,
}: IInlineThreadActionsRegular) => {
  const storageLabels = useAppSelector(selectStorageLabels)
  const dispatch = useAppDispatch()

  return (
    <S.Wrapper>
      {id && labelIds && (
        <S.Inner>
          <CustomIconButton
            icon={<FiCornerUpLeft size={SIZE} />}
            onClick={() =>
              ReplyOverview({
                id,
                dispatch,
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
                })[0]?.id
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
            onClick={() => thrashMail({ messageId: id, dispatch, labelIds })}
            icon={<AiOutlineDelete size={20} />}
            title="Delete"
            hoverColor={themeConstants.colorRed}
          />
        </S.Inner>
      )}
    </S.Wrapper>
  )
}

export default InlineThreadActionsRegular

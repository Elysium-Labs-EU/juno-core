import { useMemo } from 'react'
import { FiDelete } from 'react-icons/fi'
import * as S from './InlineThreadActionsStyles'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import DeleteDraft from '../EmailOptions/DeleteDraft'
import { selectEmailList } from '../../Store/emailListSlice'
import { selectDraft } from '../../Store/draftsSlice'
import { selectLabelIds } from '../../Store/labelsSlice'
import getEmailListIndex from '../../utils/getEmailListIndex'

const SIZE = 16

const InlineThreadActionsDraft = ({ threadId }: { threadId: string }) => {
  const dispatch = useAppDispatch()
  const emailList = useAppSelector(selectEmailList)
  const draftList = useAppSelector(selectDraft)
  const labelIds = useAppSelector(selectLabelIds)

  const emailListIndex = useMemo(
    () =>
      getEmailListIndex({ emailList, labelIds }),
    [emailList, labelIds]
  )

  const draftId =
    draftList.length > 0 &&
    draftList.find((draft) => draft.message.threadId === threadId)?.id

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconButton
          onClick={() =>
            DeleteDraft({
              threadId,
              dispatch,
              emailListIndex,
              draftId,
            })
          }
          icon={<FiDelete size={SIZE} />}
          title="Discard Draft"
        />
      </S.Inner>
    </S.Wrapper>
  )
}

export default InlineThreadActionsDraft

import { FiDelete } from 'react-icons/fi'
import * as S from './InlineThreadActionsStyles'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import discardDraft from '../EmailOptions/DiscardDraft'
import { selectDraft } from '../../Store/draftsSlice'

const SIZE = 16

const InlineThreadActionsDraft = ({ threadId }: { threadId: string }) => {
  const dispatch = useAppDispatch()
  const draftList = useAppSelector(selectDraft)

  const draftId =
    draftList.length > 0 &&
    draftList.find((draft) => draft.message.threadId === threadId)?.id

  return (
    <S.Wrapper>
      <S.Inner>
        <CustomIconButton
          onClick={() =>
            discardDraft({
              threadId,
              dispatch,
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

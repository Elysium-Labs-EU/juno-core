import * as S from './InlineThreadActionsStyles'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import discardDraft from '../EmailOptions/DiscardDraft'
import { selectDraftList } from '../../store/draftsSlice'
import { QiDiscard } from '../../images/svgIcons/quillIcons'

const ICON_SIZE = 16

const InlineThreadActionsDraft = ({ threadId }: { threadId: string }) => {
  const dispatch = useAppDispatch()
  const draftList = useAppSelector(selectDraftList)

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
          icon={<QiDiscard size={ICON_SIZE} />}
          title="Discard Draft"
        />
      </S.Inner>
    </S.Wrapper>
  )
}

export default InlineThreadActionsDraft

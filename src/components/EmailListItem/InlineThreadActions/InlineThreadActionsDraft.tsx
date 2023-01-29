import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import discardDraft from 'components/EmailOptions/DiscardDraft'
import { QiDiscard } from 'images/svgIcons/quillIcons'
import { selectDraftList } from 'store/draftsSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'

import * as S from './InlineThreadActionsStyles'
import type { IInlineThreadActions } from './InlineThreadActionsTypes'

const ICON_SIZE = 16

const InlineThreadActionsDraft = ({
  isFocused,
  threadId,
}: IInlineThreadActions) => {
  const dispatch = useAppDispatch()
  const draftList = useAppSelector(selectDraftList)

  const draftId =
    draftList.length > 0 &&
    draftList.find((draft) => draft.message.threadId === threadId)?.id

  return (
    <S.Wrapper isFocused={isFocused}>
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

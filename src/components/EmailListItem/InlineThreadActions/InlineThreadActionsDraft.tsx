import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import Stack from 'components/Elements/Stack/Stack'
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
    draftList && draftList.length > 0
      ? draftList.find((draft) => draft.message.threadId === threadId)?.id
      : undefined

  return (
    <S.Wrapper isfocused={isFocused.toString()}>
      <Stack>
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
      </Stack>
    </S.Wrapper>
  )
}

export default InlineThreadActionsDraft

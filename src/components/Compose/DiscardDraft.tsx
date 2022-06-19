import { useCallback } from 'react'
import { FiDelete } from 'react-icons/fi'
import * as local from '../../constants/composeEmailConstants'
import { selectDraft } from '../../Store/draftsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { navigateBack } from '../../Store/utilsSlice'
import CustomButton from '../Elements/Buttons/CustomButton'
import DeleteDraft from '../EmailOptions/DeleteDraft'

const DiscardDraft = ({ draftId }: { draftId: string }) => {
  const dispatch = useAppDispatch()
  const draftList = useAppSelector(selectDraft)
  const threadId = useCallback(
    () => draftList.find((draft: any) => draft.id === draftId)?.message?.id,
    [draftId]
  )

  const handleClick = useCallback(() => {
    const localThreadId = threadId() ?? ''
    DeleteDraft({
      threadId: localThreadId,
      dispatch,
      draftId,
    })
    dispatch(navigateBack())
  }, [draftId, threadId])

  return threadId() ? (
    <CustomButton
      label={local.DISCARD_DRAFT_BUTTON}
      icon={<FiDelete />}
      suppressed
      onClick={handleClick}
    />
  ) : null
}

export default DiscardDraft

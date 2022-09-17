import { useCallback } from 'react'
import * as local from '../../constants/composeEmailConstants'
import { QiDiscard } from '../../images/svgIcons/quillIcons'
import { resetDraftDetails, selectDraft } from '../../store/draftsSlice'
import {
  selectIsReplying,
  selectIsForwarding,
  setIsReplying,
  setIsForwarding,
} from '../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { navigateBack } from '../../store/utilsSlice'
import CustomButton from '../Elements/Buttons/CustomButton'
import discardDraft from '../EmailOptions/DiscardDraft'

const DiscardDraftButton = ({
  draftId,
  messageOverviewListener = undefined,
}: {
  draftId: string
  messageOverviewListener?: (value: string) => void
}) => {
  const dispatch = useAppDispatch()
  const draftList = useAppSelector(selectDraft)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)

  const draftMessage = useCallback(
    () => draftList.find((draft) => draft.id === draftId)?.message,
    [draftId, draftList]
  )

  const handleClick = useCallback(() => {
    const foundDraft = draftMessage()
    if (foundDraft) {
      const { id, threadId } = foundDraft
      discardDraft({
        messageId: isReplying || isForwarding ? id : undefined,
        threadId,
        dispatch,
        draftId: id,
      })
      if (messageOverviewListener) {
        messageOverviewListener(id)
      }
      if (isReplying) {
        dispatch(setIsReplying(false))
        return
      }
      if (isForwarding) {
        dispatch(setIsForwarding(false))
        return
      }
      dispatch(resetDraftDetails())
      dispatch(navigateBack())
    }
  }, [draftId, draftList, isForwarding, isReplying])

  return draftMessage() ? (
    <CustomButton
      label={local.DISCARD_DRAFT_BUTTON}
      icon={<QiDiscard />}
      suppressed
      onClick={handleClick}
      title="Delete"
    />
  ) : null
}

export default DiscardDraftButton

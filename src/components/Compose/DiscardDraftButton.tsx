import { useCallback } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import discardDraft from 'components/EmailOptions/DiscardDraft'
import * as local from 'constants/composeEmailConstants'
import { QiDiscard } from 'images/svgIcons/quillIcons'
import { selectDraftList } from 'store/draftsSlice'
import {
  selectIsForwarding,
  selectIsReplying,
  setIsForwarding,
  setIsReplying,
} from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { navigateBack } from 'store/utilsSlice'

interface IDiscardDraftButton {
  id: string
  draftId: string
  threadId: string
  messageOverviewListener?: (
    evenType: 'cancel' | 'discard',
    messageId?: string
  ) => void
}

const DiscardDraftButton = ({
  draftId,
  threadId,
  id,
  messageOverviewListener = undefined,
}: IDiscardDraftButton) => {
  const dispatch = useAppDispatch()
  const draftList = useAppSelector(selectDraftList)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)

  const handleClick = useCallback(() => {
    discardDraft({
      messageId: isReplying || isForwarding ? id : undefined,
      threadId,
      dispatch,
      draftId,
    })
    if (messageOverviewListener) {
      messageOverviewListener('discard', id)
    }
    if (isReplying) {
      dispatch(setIsReplying(false))
      return
    }
    if (isForwarding) {
      dispatch(setIsForwarding(false))
      return
    }
    dispatch(navigateBack())
  }, [draftId, draftList, isForwarding, isReplying])

  return (
    <CustomButton
      label={local.DISCARD_DRAFT_BUTTON}
      icon={<QiDiscard />}
      suppressed
      onClick={handleClick}
      title="Delete"
    />
  )
}

export default DiscardDraftButton

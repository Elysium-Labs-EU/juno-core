import { useCallback } from 'react'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds, setCurrentLabels } from '../../store/labelsSlice'
import {
  selectActiveModal,
  selectInSearch,
  selectIsFlexibleFlowActive,
  selectIsLoading,
} from '../../store/utilsSlice'
import startSort from '../../utils/startSort'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  setActiveEmailListIndex,
} from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import labelURL from '../../utils/createLabelURL'
import {
  setCoreStatus,
  setSessionViewIndex,
} from '../../store/emailDetailSlice'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { setModifierKey } from '../../utils/setModifierKey'
import { Sort } from '../../images/svgIcons/quillIcons'
import { INBOX_LABEL } from './InboxIndicator/InboxIndicatorBar'
import CustomButton from '../Elements/Buttons/CustomButton'
import getEmailListIndex from '../../utils/getEmailListIndex'

const INBOX_BUTTON = 'Sort inbox'
const actionKeys = [setModifierKey, keyConstants.KEY_E]

const SortInbox = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const activeModal = useAppSelector(selectActiveModal)
  const inSearch = useAppSelector(selectInSearch)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const dispatch = useAppDispatch()
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)

  const handleEvent = useCallback(() => {
    const staticLabelURL = labelURL(INBOX_LABEL)
    if (staticLabelURL) {
      // If the strict flow is active, find the index and set the labels and email list on click.
      if (!isFlexibleFlowActive) {
        const emailListIndex = getEmailListIndex({
          emailList,
          labelIds: INBOX_LABEL,
        })
        dispatch(setActiveEmailListIndex(emailListIndex))
        dispatch(setCurrentLabels(INBOX_LABEL))
        startSort({
          dispatch,
          labelURL: staticLabelURL,
          emailList,
          activeEmailListIndex: emailListIndex,
        })
      } else {
        startSort({
          dispatch,
          labelURL: staticLabelURL,
          emailList,
          activeEmailListIndex,
        })
      }
      dispatch(setCoreStatus(global.CORE_STATUS_SORTING))
      dispatch(setSessionViewIndex(0))
    }
  }, [
    activeEmailListIndex,
    dispatch,
    emailList,
    labelIds,
    isFlexibleFlowActive,
  ])

  useMultiKeyPress(handleEvent, actionKeys, inSearch || Boolean(activeModal))

  const isDisabled =
    isLoading ||
    activeEmailListIndex < 0 ||
    emailList[activeEmailListIndex].threads.length === 0

  return isFlexibleFlowActive ? (
    <CustomAttentionButton
      onClick={handleEvent}
      disabled={isDisabled}
      label={INBOX_BUTTON}
      variant="secondary"
      title={!isDisabled ? 'Start sorting inbox' : 'There is nothing to sort'}
      icon={<Sort color="var(--color-black)" size={20} />}
    />
  ) : (
    <CustomButton
      onClick={handleEvent}
      disabled={isDisabled}
      label={INBOX_BUTTON}
      title="Start sorting inbox"
      icon={<Sort color="var(--color-black)" size={20} />}
    />
  )
}

export default SortInbox

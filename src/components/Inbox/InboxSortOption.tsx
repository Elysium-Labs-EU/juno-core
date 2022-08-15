import { useCallback } from 'react'
import * as global from '../../constants/globalConstants'
import * as keyConstants from '../../constants/keyConstants'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../store/labelsSlice'
import { selectInSearch, selectIsLoading } from '../../store/utilsSlice'
import startSort from '../../utils/startSort'
import {
  selectActiveEmailListIndex,
  selectEmailList,
} from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import labelURL from '../../utils/createLabelURL'
import {
  setCoreStatus,
  setSessionViewIndex,
} from '../../store/emailDetailSlice'
import useMultiKeyPress from '../../hooks/useMultiKeyPress'
import { setModifierKey } from '../../utils/setModifierKey'

const INBOX_BUTTON = 'Sort inbox'
const actionKeys = [setModifierKey, keyConstants.KEY_E]

const SortInbox = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const inSearch = useAppSelector(selectInSearch)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const dispatch = useAppDispatch()

  const handleEvent = useCallback(() => {
    const staticLabelURL = labelURL(labelIds)
    if (staticLabelURL) {
      startSort({
        dispatch,
        labelURL: staticLabelURL,
        emailList,
        activeEmailListIndex,
      })
      dispatch(setCoreStatus(global.CORE_STATUS_SORTING))
      dispatch(setSessionViewIndex(0))
    }
  }, [activeEmailListIndex, dispatch, emailList, labelIds])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  const isDisabled =
    isLoading ||
    activeEmailListIndex < 0 ||
    emailList[activeEmailListIndex].threads.length === 0

  return (
    <CustomAttentionButton
      onClick={handleEvent}
      disabled={isDisabled}
      label={INBOX_BUTTON}
      variant="secondary"
      title={!isDisabled ? 'Start sorting inbox' : 'There is nothing to sort'}
    />
  )
}

export default SortInbox

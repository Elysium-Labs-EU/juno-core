import { useCallback } from 'react'
import * as global from '../../constants/globalConstants'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectInSearch, selectIsLoading } from '../../Store/utilsSlice'
import startSort from '../../utils/startSort'
import {
  selectActiveEmailListIndex,
  selectEmailList,
  setCoreStatus,
} from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import labelURL from '../../utils/createLabelURL'
import { setSessionViewIndex } from '../../Store/emailDetailSlice'
import useMultiKeyPress from '../../Hooks/useMultiKeyPress'
import modifierKey from '../../utils/setModifierKey'

const INBOX_BUTTON = 'Sort inbox'
const actionKeys = [modifierKey, global.KEY_E]

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

  return (
    <CustomAttentionButton
      onClick={handleEvent}
      disabled={
        isLoading ||
        activeEmailListIndex < 0 ||
        emailList[activeEmailListIndex].threads.length === 0
      }
      label={INBOX_BUTTON}
      variant="secondary"
    />
  )
}

export default SortInbox

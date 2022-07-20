import { useCallback } from 'react'
import * as global from '../../constants/globalConstants'
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
import modifierKey from '../../utils/setModifierKey'
import StyledTooltip from '../Elements/StyledTooltip'

const INBOX_BUTTON = 'Sort inbox'
const TOOLTIP_ABLE = 'Start sorting the emails'
const TOOLTIP_DISABLE = 'Cannot sort the inbox, no emails'
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

  const isDisabled = isLoading ||
    activeEmailListIndex < 0 ||
    emailList[activeEmailListIndex].threads.length === 0

  return (
    <StyledTooltip title={isDisabled ? TOOLTIP_DISABLE : TOOLTIP_ABLE}>
      <div>
        <CustomAttentionButton
          onClick={handleEvent}
          disabled={
            isDisabled
          }
          label={INBOX_BUTTON}
          variant="secondary"
        />
      </div>
    </StyledTooltip>
  )
}

export default SortInbox

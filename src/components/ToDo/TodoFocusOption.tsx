import { useCallback } from 'react'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../store/labelsSlice'
import { selectInSearch, selectIsLoading } from '../../store/utilsSlice'
import * as S from './TodoFocusOptionStyles'
import * as local from '../../constants/todoConstants'
import * as global from '../../constants/globalConstants'
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

const actionKeys = [modifierKey, global.KEY_E]

const TodoFocusOption = () => {
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const inSearch = useAppSelector(selectInSearch)
  const emailList = useAppSelector(selectEmailList)
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
      dispatch(setCoreStatus(global.CORE_STATUS_FOCUSED))
      dispatch(setSessionViewIndex(0))
    }
  }, [activeEmailListIndex, dispatch, emailList, labelIds])

  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <S.SortContainer>
      <CustomAttentionButton
        onClick={handleEvent}
        disabled={
          isLoading ||
          activeEmailListIndex < 0 ||
          emailList[activeEmailListIndex].threads.length === 0
        }
        label={local.BUTTON_FOCUS}
      />
    </S.SortContainer>
  )
}

export default TodoFocusOption

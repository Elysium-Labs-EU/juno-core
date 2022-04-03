import { useCallback } from 'react'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectInSearch, selectIsLoading } from '../../Store/utilsSlice'
import * as S from './TodoFocusOptionStyles'
import * as local from '../../constants/todoConstants'
import * as global from '../../constants/globalConstants'
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
import useKeyCombo from '../../Hooks/useKeyCombo'

const actionKeys = [global.KEY_OS, global.KEY_E]

const TodoFocusOption = () => {
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const inSearch = useAppSelector(selectInSearch)
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()

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

  useKeyCombo({ handleEvent, keysPressed, actionKeys, inSearch })

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

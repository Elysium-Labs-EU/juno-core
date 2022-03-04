import { useEffect, useMemo } from 'react'
import CustomAttentionButton from '../Elements/Buttons/CustomAttentionButton'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import * as S from './TodoFocusOptionStyles'
import * as local from '../../constants/todoConstants'
import * as global from '../../constants/globalConstants'
import startSort from '../../utils/startSort'
import { selectEmailList, setCoreStatus } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import labelURL from '../../utils/createLabelURL'
import { setSessionViewIndex } from '../../Store/emailDetailSlice'
import getEmailListIndex from '../../utils/getEmailListIndex'
import useMultiKeyPress from '../../Hooks/useMultiKeyPress'

const TodoFocusOption = () => {
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const emailList = useAppSelector(selectEmailList)
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()

  const emailListIndex = useMemo(
    () => getEmailListIndex({ emailList, labelIds }),
    [emailList, labelIds]
  )

  const activateFocusMode = () => {
    const staticLabelURL = labelURL(labelIds)
    if (staticLabelURL) {
      startSort({
        dispatch,
        labelURL: staticLabelURL,
        emailList,
        emailListIndex,
      })
      dispatch(setCoreStatus(global.CORE_STATUS_FOCUSED))
      dispatch(setSessionViewIndex(0))
    }
  }

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      keysPressed.includes(global.KEY_OSLEFT) &&
      keysPressed.includes(global.KEY_E)
    ) {
      activateFocusMode()
    }
    return () => {
      mounted = false
    }
  }, [keysPressed])

  return (
    <S.SortContainer>
      <CustomAttentionButton
        onClick={activateFocusMode}
        disabled={
          isLoading ||
          emailListIndex < 0 ||
          emailList[emailListIndex].threads.length === 0
        }
        label={local.BUTTON_FOCUS}
      />
    </S.SortContainer>
  )
}

export default TodoFocusOption

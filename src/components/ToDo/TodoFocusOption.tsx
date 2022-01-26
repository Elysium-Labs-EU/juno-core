import { useMemo } from 'react'
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

const TodoFocusOption = () => {
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const emailList = useAppSelector(selectEmailList)
  const dispatch = useAppDispatch()

  const emailListIndex = useMemo(
    () =>
      emailList.findIndex(
        (threadList) =>
          threadList.labels && threadList.labels.includes(labelIds[0])
      ),
    [emailList, labelIds]
  )

  const handleClick = () => {
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

  return (
    <S.SortContainer>
      <CustomAttentionButton
        onClick={handleClick}
        disabled={isLoading || emailListIndex < 0}
        label={local.BUTTON_FOCUS}
      />
    </S.SortContainer>
  )
}

export default TodoFocusOption

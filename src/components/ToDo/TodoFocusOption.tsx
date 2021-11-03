import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { CustomButtonText } from '../Elements/Buttons'
import { convertArrayToString } from '../../utils'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import * as S from './TodoFocusOptionStyles'
import * as local from '../../constants/todoConstants'
import startSort from '../../utils/startSort'
import { selectEmailList, setIsFocused } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'

const TodoFocusOption = () => {
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const emailList = useAppSelector(selectEmailList)
  const history = useHistory()
  const dispatch = useAppDispatch()

  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const handleClick = () => {
    const labelURL = convertArrayToString(labelIds && labelIds)
    startSort({ history, labelURL, emailList, emailListIndex })
    dispatch(setIsFocused(true))
  }

  return (
    <S.SortContainer>
      <CustomButtonText
        className="sort-button"
        onClick={handleClick}
        disabled={isLoading || emailListIndex < 0}
        label={local.BUTTON_FOCUS}
      />
    </S.SortContainer>
  )
}

export default TodoFocusOption

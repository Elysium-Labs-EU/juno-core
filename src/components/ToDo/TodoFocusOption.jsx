import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CustomButtonText } from '../Elements/Buttons'
import { convertArrayToString, startSort } from '../../utils'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectEmailList } from '../../Store/emailListSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import * as S from './TodoFocusOptionStyles'
import * as local from '../../constants/todoConstants'

const TodoFocusOption = () => {
  const labelIds = useSelector(selectLabelIds)
  const isLoading = useSelector(selectIsLoading)
  const emailList = useSelector(selectEmailList)
  const history = useHistory()
  const labelURL = () => {
    return convertArrayToString(labelIds && labelIds)
  }

  return (
    <S.SortContainer>
      <CustomButtonText
        className="sort-button"
        onClick={() => startSort(history, labelURL, emailList)}
        disabled={isLoading}
        label={local.BUTTON_FOCUS}
      />
    </S.SortContainer>
  )
}

export default TodoFocusOption

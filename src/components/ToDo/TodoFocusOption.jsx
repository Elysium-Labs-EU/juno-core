import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CustomButtonText } from '../Elements/Buttons'
import { convertArrayToString } from '../../utils'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectMetaList } from '../../Store/metaListSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import * as S from './TodoFocusOptionStyles'
import * as local from '../../constants/todoConstants'
import startSort from '../../utils/startSort'
import { setIsFocused } from '../../Store/emailListSlice'

const TodoFocusOption = () => {
  const labelIds = useSelector(selectLabelIds)
  const isLoading = useSelector(selectIsLoading)
  const metaList = useSelector(selectMetaList)
  const history = useHistory()
  const dispatch = useDispatch()

  const metaListIndex = useMemo(
    () =>
      metaList.findIndex((threadList) =>
        threadList.labels.includes(...labelIds)
      ),
    [metaList, labelIds]
  )

  const handleClick = () => {
    const labelURL = convertArrayToString(labelIds && labelIds)
    startSort({ history, labelURL, metaList, metaListIndex })
    dispatch(setIsFocused(true))
  }

  return (
    <S.SortContainer>
      <CustomButtonText
        className="sort-button"
        onClick={handleClick}
        disabled={isLoading}
        label={local.BUTTON_FOCUS}
      />
    </S.SortContainer>
  )
}

export default TodoFocusOption

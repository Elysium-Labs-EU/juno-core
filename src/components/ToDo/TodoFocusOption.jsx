import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './TodoFocusOption.scss'
import { MdRefresh } from 'react-icons/md'
import { CustomButtonText, CustomIconLink } from '../Elements/Buttons'
import { convertArrayToString, startSort } from '../../utils'
import { refreshEmailFeed, selectMetaList } from '../../Store/metaListSlice'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectEmailList } from '../../Store/emailListSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import * as S from './TodoFocusOptionStyles'
import * as local from '../../constants/todoConstants'

const TodoFocusOption = () => {
  const dispatch = useDispatch()
  const labelIds = useSelector(selectLabelIds)
  const isLoading = useSelector(selectIsLoading)
  const metaList = useSelector(selectMetaList)
  const emailList = useSelector(selectEmailList)
  const history = useHistory()
  const labelURL = () => {
    return convertArrayToString(labelIds && labelIds)
  }

  const refreshFeed = () => {
    const params = {
      labelIds,
      maxResults: 100,
    }
    dispatch(refreshEmailFeed(params, metaList))
  }

  return (
    <S.SortContainer>
      <CustomIconLink
        className="btn btn-light"
        onClick={() => refreshFeed()}
        disabled={isLoading}
        icon={<MdRefresh />}
      />
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

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MdRefresh } from 'react-icons/md'
import { CustomButtonText, CustomIconLink } from '../Elements/Buttons'
import { convertArrayToString } from '../../utils'
import { refreshEmailFeed, selectMetaList } from '../../Store/metaListSlice'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import * as S from './InboxSortOptionStyles'
import startSort from '../../utils/startSort'
import { setIsSorting } from '../../Store/emailListSlice'

const INBOX_BUTTON = 'Sort inbox'

const SortInbox = () => {
  const metaList = useSelector(selectMetaList)
  const labelIds = useSelector(selectLabelIds)
  const isLoading = useSelector(selectIsLoading)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleClick = () => {
    const labelURL = convertArrayToString(labelIds && labelIds)
    startSort({ history, labelURL, metaList })
    dispatch(setIsSorting(true))
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
        className="button button-light"
        onClick={() => refreshFeed()}
        disabled={isLoading}
        icon={<MdRefresh />}
      />
      <CustomButtonText
        className="sort-button"
        onClick={handleClick}
        disabled={isLoading}
        label={INBOX_BUTTON}
      />
    </S.SortContainer>
  )
}

export default SortInbox

import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MdRefresh } from 'react-icons/md'
import { CustomButtonText, CustomIconLink } from '../Elements/Buttons'
import { convertArrayToString } from '../../utils'
import {
  refreshEmailFeed,
  selectIsFetching,
  selectMetaList,
} from '../../Store/metaListSlice'
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
  const isFetching = useSelector(selectIsFetching)
  const dispatch = useDispatch()
  const history = useHistory()
  const [disableRefresh, setDisableRefresh] = useState(false)

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
    dispatch(setIsSorting(true))
  }

  const refreshFeed = () => {
    const params = {
      labelIds,
      maxResults: 500,
    }
    dispatch(refreshEmailFeed(params))
  }

  useEffect(() => {
    if (isFetching) {
      setDisableRefresh(true)
    }
    if (!isFetching) {
      setTimeout(() => {
        setDisableRefresh(false)
      }, 3000)
    }
  }, [isFetching])

  return (
    <S.SortContainer>
      <CustomIconLink
        className="button button-light"
        onClick={() => refreshFeed()}
        disabled={isLoading || disableRefresh}
        icon={<MdRefresh />}
        style={{ marginRight: '1rem' }}
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

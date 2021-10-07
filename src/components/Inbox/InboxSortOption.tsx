import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { MdRefresh } from 'react-icons/md'
import { CustomButtonText, CustomIconLink } from '../Elements/Buttons'
import { convertArrayToString } from '../../utils'
import { refreshEmailFeed, selectIsFetching } from '../../Store/metaListSlice'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'
import * as S from './InboxSortOptionStyles'
import startSort from '../../utils/startSort'
import { selectEmailList, setIsSorting } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'

const INBOX_BUTTON = 'Sort inbox'

const SortInbox = () => {
  const emailList = useAppSelector(selectEmailList)
  const labelIds = useAppSelector(selectLabelIds)
  const isLoading = useAppSelector(selectIsLoading)
  const isFetching = useAppSelector(selectIsFetching)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const [disableRefresh, setDisableRefresh] = useState(false)

  const emailListIndex = useMemo(
    () => emailList.findIndex((threadList) => threadList.labels.includes(labelIds[0])),
    [emailList, labelIds]
  )

  const handleClick = () => {
    const labelURL = convertArrayToString(labelIds && labelIds)
    startSort({ history, labelURL, emailList, emailListIndex })
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
    return () => setDisableRefresh(false)
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

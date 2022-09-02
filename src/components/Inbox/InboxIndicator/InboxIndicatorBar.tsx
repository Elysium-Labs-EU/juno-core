import { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'

import * as global from '../../../constants/globalConstants'
import useFetchThreadsTotalNumber from '../../../hooks/useFetchThreadsTotalNumber'
import { fetchEmailsSimple } from '../../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectLoadedInbox } from '../../../store/labelsSlice'
import SortInbox from '../InboxSortOption'
import * as S from './InboxIndicatorBarStyles'

export const INBOX_LABEL = ['INBOX']

const LoadedInboxIndicator = () => {
  const { totalThreads, loadingState } = useFetchThreadsTotalNumber(INBOX_LABEL)

  const resultMap = {
    [global.LOAD_STATE_MAP.loaded]: totalThreads,
    [global.LOAD_STATE_MAP.loading]: <CircularProgress size={10} />,
    [global.LOAD_STATE_MAP.idle]: <CircularProgress size={10} />,
  }

  return (
    <S.BarWrapper>
      <S.TextWrapper>
        There are {resultMap[loadingState]} emails in your hidden inbox
      </S.TextWrapper>
      <SortInbox />
    </S.BarWrapper>
  )
}

const InboxIndicatorBar = () => {
  const dispatch = useAppDispatch()
  const loadedInbox = useAppSelector(selectLoadedInbox)
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)

  useEffect(() => {
    let mounted = true
    if (loadedInbox.flat(1).indexOf(INBOX_LABEL[0]) === -1) {
      setLoadState(global.LOAD_STATE_MAP.loading)
      const params = {
        labelIds: INBOX_LABEL,
        maxResults: 10,
        nextPageToken: null,
      }

      if (mounted) {
        dispatch(fetchEmailsSimple(params))
      }
    }
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (loadedInbox.flat(1).indexOf(INBOX_LABEL[0]) !== -1) {
      setLoadState(global.LOAD_STATE_MAP.loaded)
    }
  }, [loadedInbox])

  // TODO: Allow the user to set the number indicator to be a term, such as: "a few" "some" "many" - these are tiers based on qty.

  return (
    <S.Wrapper>
      {loadState === global.LOAD_STATE_MAP.loaded && <LoadedInboxIndicator />}
    </S.Wrapper>
  )
}

export default InboxIndicatorBar

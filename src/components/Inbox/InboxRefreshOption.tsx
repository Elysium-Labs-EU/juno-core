import { useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import * as S from './InboxRefreshOptionStyles'
import { refreshEmailFeed, selectIsFetching } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectIsLoading } from '../../Store/utilsSlice'
import { INBOX_LABEL } from './Inbox'

const refreshFeed = (dispatch: Function) => {
  const params = {
    maxResults: 500,
    nextPageToken: null,
    labelIds: INBOX_LABEL,
  }
  dispatch(refreshEmailFeed(params))
}

const InboxRefresh = () => {
  const [disableRefresh, setDisableRefresh] = useState(false)
  const isFetching = useAppSelector(selectIsFetching)
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setDisableRefresh(true)

    const disableTimer = setTimeout(() => {
      setDisableRefresh(false)
    }, 3000)

    return () => {
      clearTimeout(disableTimer)
      setDisableRefresh(false)
    }
  }, [isFetching])

  return (
    <S.RotatingButton
      onClick={() => refreshFeed(dispatch)}
      disabled={isLoading || disableRefresh}
      type="button"
      disableRefresh={disableRefresh}
    >
      <MdRefresh size={20} />
    </S.RotatingButton>
  )
}

export default InboxRefresh

import { useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import styled, { css, keyframes } from 'styled-components'
import * as theme from '../../constants/themeConstants'
import { refreshEmailFeed, selectIsFetching } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectIsLoading } from '../../Store/utilsSlice'
import { INBOX_LABEL } from './Inbox'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const rotatingIcon = css`
  animation: ${rotate} 1s ease infinite;
`

interface IRotatingButton {
  disableRefresh: boolean
}

const RotatingButton = styled.button<IRotatingButton>`
  border: none;
  color: ${theme.colorGrey};
  outline: none;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  padding: 0;

  &:hover {
    color: ${theme.colorBlack};
    cursor: pointer;
  }
  ${(props) => (props.disableRefresh ? rotatingIcon : null)};
`

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
    <RotatingButton
      onClick={() => refreshFeed(dispatch)}
      disabled={isLoading || disableRefresh}
      type="button"
      disableRefresh={disableRefresh}
    >
      <MdRefresh size={20} />
    </RotatingButton>
  )
}

export default InboxRefresh

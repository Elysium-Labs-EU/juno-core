import { useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import styled, { css, keyframes } from 'styled-components'
import * as theme from '../../constants/themeConstants'
import { refreshEmailFeed, selectIsFetching } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectLabelIds } from '../../Store/labelsSlice'
import { selectIsLoading } from '../../Store/utilsSlice'

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

const InboxRefresh = () => {
  const [disableRefresh, setDisableRefresh] = useState(false)
  const labelIds = useAppSelector(selectLabelIds)
  const isFetching = useAppSelector(selectIsFetching)
  const isLoading = useAppSelector(selectIsLoading)
  const dispatch = useAppDispatch()

  const refreshFeed = () => {
    const params = {
      labelIds,
      maxResults: 500,
    }
    dispatch(refreshEmailFeed(params))
  }

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
      onClick={() => refreshFeed()}
      disabled={isLoading || disableRefresh}
      type="button"
      disableRefresh={disableRefresh}
    >
      <MdRefresh size={20} />
    </RotatingButton>
  )
}

export default InboxRefresh

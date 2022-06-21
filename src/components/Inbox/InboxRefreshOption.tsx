import { useCallback, useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import styled, { css, keyframes } from 'styled-components'
import useKeyPress from '../../Hooks/useKeyPress'
import { refreshEmailFeed, selectIsFetching } from '../../Store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import { selectInSearch, selectIsLoading } from '../../Store/utilsSlice'
import * as global from '../../constants/globalConstants'

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
  color: var(--color-grey);
  outline: none;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  padding: 0;
  line-height: 0;

  &:hover {
    color: var(--color-black);
    cursor: pointer;
  }
  ${({ disableRefresh }) => (disableRefresh ? rotatingIcon : null)};
`

const refreshFeed = (dispatch: Function) => {
  dispatch(refreshEmailFeed())
}

const InboxRefresh = () => {
  const [disableRefresh, setDisableRefresh] = useState(false)
  const isFetching = useAppSelector(selectIsFetching)
  const isLoading = useAppSelector(selectIsLoading)
  const inSearch = useAppSelector(selectInSearch)
  const KeyListener = useKeyPress(global.KEY_R)
  const dispatch = useAppDispatch()

  const handleClick = useCallback(() => {
    refreshFeed(dispatch)
  }, [])

  useEffect(() => {
    let mounted = true
    if (KeyListener && !inSearch && mounted && !disableRefresh && !isLoading) {
      handleClick()
    }
    return () => {
      mounted = false
    }
  }, [KeyListener, inSearch, disableRefresh, isLoading])

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
      onClick={handleClick}
      disabled={isLoading || disableRefresh}
      type="button"
      disableRefresh={disableRefresh}
    >
      <MdRefresh size={20} />
    </RotatingButton>
  )
}

export default InboxRefresh

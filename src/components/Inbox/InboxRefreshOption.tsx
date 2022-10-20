import { useCallback, useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import styled, { css, keyframes } from 'styled-components'

import * as keyConstants from '../../constants/keyConstants'
import useKeyPress from '../../hooks/useKeyPress'
import { refreshEmailFeed, selectIsFetching } from '../../store/emailListSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { AppDispatch } from '../../store/store'
import { selectInSearch, selectIsLoading } from '../../store/utilsSlice'
import CustomButton from '../Elements/Buttons/CustomButton'

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

interface IRotatingIcon {
  disableRefresh: boolean
}

const RotatingIcon = styled.div<IRotatingIcon>`
  ${({ disableRefresh }) => (disableRefresh ? rotatingIcon : null)};
`

const refreshFeed = (dispatch: AppDispatch) => {
  dispatch(refreshEmailFeed())
}

const LABEL_INACTIVE = 'Refresh inbox'
const LABEL_ACTIVE = 'Refreshing inbox...'

const InboxRefresh = ({
  showButtonLabel = false,
}: {
  showButtonLabel?: boolean
}) => {
  const [disableRefresh, setDisableRefresh] = useState(false)
  const isFetching = useAppSelector(selectIsFetching)
  const isLoading = useAppSelector(selectIsLoading)
  const inSearch = useAppSelector(selectInSearch)
  const KeyListener = useKeyPress(keyConstants.keyConstants.KEY_LETTERS.R)
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
    let disableTimer: NodeJS.Timeout | null
    if (isFetching) {
      setDisableRefresh(true)

      disableTimer = setTimeout(() => {
        setDisableRefresh(false)
      }, 3000)
    }
    return () => {
      disableTimer && clearTimeout(disableTimer)
      setDisableRefresh(false)
    }
  }, [isFetching])

  return (
    <CustomButton
      label={showButtonLabel ? LABEL_INACTIVE : null}
      onClick={handleClick}
      disabled={isLoading || disableRefresh}
      title={!disableRefresh ? LABEL_INACTIVE : LABEL_ACTIVE}
      icon={
        <RotatingIcon disableRefresh={disableRefresh}>
          <MdRefresh size={20} />
        </RotatingIcon>
      }
    />
  )
}

export default InboxRefresh

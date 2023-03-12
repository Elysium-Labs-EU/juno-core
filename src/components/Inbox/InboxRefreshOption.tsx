import { useCallback, useEffect, useState } from 'react'
import { MdRefresh } from 'react-icons/md'
import styled, { css, keyframes } from 'styled-components'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import StyledTooltip from 'components/Elements/StyledTooltip'
import * as keyConstants from 'constants/keyConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import { refreshEmailFeed, selectIsFetching } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectActiveModal,
  selectInSearch,
  selectIsLoading,
} from 'store/utilsSlice'

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

const LABEL_INACTIVE = 'Refresh inbox'
const LABEL_ACTIVE = 'Refreshing inbox...'

const styles = (showButtonLabel: boolean) => ({
  color: showButtonLabel ? 'var(--color-white)' : undefined,
  padding: 0,
})

const InboxRefresh = ({
  showButtonLabel = false,
}: {
  showButtonLabel?: boolean
}) => {
  const [disableRefresh, setDisableRefresh] = useState(false)
  const activeModal = useAppSelector(selectActiveModal)
  const isFetching = useAppSelector(selectIsFetching)
  const isLoading = useAppSelector(selectIsLoading)
  const inSearch = useAppSelector(selectInSearch)
  const dispatch = useAppDispatch()

  const handleRefreshTrigger = useCallback(() => {
    dispatch(refreshEmailFeed())
  }, [])

  useKeyboardShortcut({
    handleEvent: handleRefreshTrigger,
    modifierKey: keyConstants.KEY_SPECIAL.shift,
    key: keyConstants.KEY_LETTERS.r,
    isDisabled: inSearch || disableRefresh || isLoading || !!activeModal,
  })

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
    <StyledTooltip title={!disableRefresh ? LABEL_INACTIVE : LABEL_ACTIVE}>
      <CustomButton
        label={showButtonLabel ? LABEL_INACTIVE : null}
        onClick={handleRefreshTrigger}
        disabled={isLoading || disableRefresh}
        title={!disableRefresh ? LABEL_INACTIVE : LABEL_ACTIVE}
        style={styles(showButtonLabel)}
        icon={
          <RotatingIcon disableRefresh={disableRefresh}>
            <MdRefresh size={20} />
          </RotatingIcon>
        }
        suppressed
      />
    </StyledTooltip>
  )
}

export default InboxRefresh

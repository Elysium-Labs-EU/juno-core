import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

import * as keyConstants from '../../../constants/keyConstants'
import RoutesConstants from '../../../constants/routes.json'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import {
  QiCompose,
  QiInbox,
  QiSearch,
  QiToDo,
} from '../../../images/svgIcons/quillIcons'
import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  navigateTo,
  selectActiveModal,
  selectInSearch,
  selectIsFlexibleFlowActive,
  setInSearch,
} from '../../../store/utilsSlice'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import StyledTooltip from '../../Elements/StyledTooltip'
import NavigationMore from './More/NavigationMore'
import * as S from './NavigationStyles'

const ICON_SIZE = 18

const Navigation = () => {
  const [active, setActive] = useState('')
  const inSearch = useAppSelector(selectInSearch)
  const activeModal = useAppSelector(selectActiveModal)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()

  useEffect(() => {
    if (location.pathname.includes('inbox')) {
      setActive('inbox')
    }
    if (location.pathname.includes('compose')) {
      setActive('compose')
    }
    if (location.pathname === '/') {
      setActive('todo')
    }
  }, [location])

  useEffect(() => {
    let mounted = true
    if (
      mounted &&
      !inSearch &&
      !activeModal &&
      !location.pathname.includes('/compose') &&
      !isReplying &&
      !isForwarding
    ) {
      if (keysPressed.includes(keyConstants.KEY_DIGIT_1)) {
        dispatch(navigateTo(RoutesConstants.TODO))
      }
      if (keysPressed.includes(keyConstants.KEY_DIGIT_2) && !isFlexibleFlowActive) {
        dispatch(navigateTo(RoutesConstants.INBOX))
      }
      if (keysPressed.includes(keyConstants.KEY_DIGIT_3)) {
        dispatch(setInSearch(true))
      }
      if (keysPressed.includes(keyConstants.KEY_DIGIT_4)) {
        dispatch(navigateTo('/compose'))
      }
    }
    return () => {
      mounted = false
    }
  }, [keysPressed, inSearch, activeModal, location, isReplying, isForwarding, isFlexibleFlowActive])

  const NavControllers = useMemo(
    () => (
      <S.NavControls>
        <S.NavList>
          <StyledTooltip title="To Do">
            <S.NavItem>
              <CustomIconButton
                icon={<QiToDo size={ICON_SIZE} />}
                onClick={() => dispatch(navigateTo(RoutesConstants.TODO))}
                isActive={active === 'todo'}
                title=""
              />
            </S.NavItem>
          </StyledTooltip>

          {isFlexibleFlowActive ? (
            <StyledTooltip title="Inbox">
              <S.NavItem>
                <CustomIconButton
                  icon={<QiInbox size={ICON_SIZE} />}
                  onClick={() => dispatch(navigateTo(RoutesConstants.INBOX))}
                  isActive={active === 'inbox'}
                  title=""
                />
              </S.NavItem>
            </StyledTooltip>
          ) : null}

          <StyledTooltip title="Search">
            <S.NavItem>
              <CustomIconButton
                icon={<QiSearch size={ICON_SIZE} />}
                isActive={active === 'search'}
                onClick={() => dispatch(setInSearch(true))}
                title=""
              />
            </S.NavItem>
          </StyledTooltip>

          <StyledTooltip title="Compose">
            <S.NavItem>
              <CustomIconButton
                icon={<QiCompose size={ICON_SIZE} />}
                isActive={active === 'compose'}
                onClick={() => {
                  dispatch(navigateTo('/compose'))
                }}
                title="Compose"
              />
            </S.NavItem>
          </StyledTooltip>

          <S.NavItem>
            <NavigationMore />
          </S.NavItem>
        </S.NavList>
      </S.NavControls>
    ),
    [active, isFlexibleFlowActive]
  )

  return NavControllers
}

export default Navigation

import { useEffect, useMemo, useState } from 'react'
import { FiCheckSquare, FiEdit, FiInbox, FiSearch } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

import * as keyConstants from '../../../constants/keyConstants'
import Routes from '../../../constants/routes.json'
import useMultiKeyPress from '../../../hooks/useMultiKeyPress'
import {
  selectIsForwarding,
  selectIsReplying,
} from '../../../store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  navigateTo,
  selectActiveModal,
  selectInSearch,
  setInSearch,
} from '../../../store/utilsSlice'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import StyledTooltip from '../../Elements/StyledTooltip'
import NavigationMore from './More/NavigationMore'
import * as S from './NavigationStyles'

const SIZE = 16

const Navigation = () => {
  const [active, setActive] = useState('')
  const inSearch = useAppSelector(selectInSearch)
  const activeModal = useAppSelector(selectActiveModal)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
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
        dispatch(navigateTo(Routes.HOME))
      }
      // if (keysPressed.includes(keyConstants.KEY_DIGIT_2)) {
      //   dispatch(navigateTo(Routes.INBOX))
      // }
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
  }, [keysPressed, inSearch, activeModal, location, isReplying, isForwarding])

  const NavControllers = useMemo(
    () => (
      <S.NavControls>
        <S.NavList>
          <StyledTooltip title="To Do">
            <S.NavItem>
              <CustomIconButton
                icon={<FiCheckSquare size={SIZE} />}
                onClick={() => dispatch(navigateTo(Routes.HOME))}
                isActive={active === 'todo'}
                title="To Do"
              />
            </S.NavItem>
          </StyledTooltip>

          {/* <StyledTooltip title="Inbox">
            <S.NavItem>
              <CustomIconButton
                icon={<FiInbox size={SIZE} />}
                onClick={() => dispatch(navigateTo(Routes.INBOX))}
                isActive={active === 'inbox'}
                title="Inbox"
              />
            </S.NavItem>
          </StyledTooltip> */}

          <StyledTooltip title="Search">
            <S.NavItem>
              <CustomIconButton
                icon={<FiSearch size={SIZE} />}
                isActive={active === 'search'}
                onClick={() => dispatch(setInSearch(true))}
                title="Search"
              />
            </S.NavItem>
          </StyledTooltip>

          <StyledTooltip title="Compose">
            <S.NavItem>
              <CustomIconButton
                icon={<FiEdit size={SIZE} />}
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
    [active]
  )

  return NavControllers
}

export default Navigation

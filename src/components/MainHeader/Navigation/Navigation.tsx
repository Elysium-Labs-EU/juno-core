import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledTooltip from 'components/Elements/StyledTooltip'
import * as keyConstants from 'constants/keyConstants'
import RoutesConstants from 'constants/routes.json'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import {
  QiCompose,
  QiInbox,
  QiSearch,
  QiToDo,
} from 'images/svgIcons/quillIcons'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'
import { selectIsForwarding, selectIsReplying } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  navigateTo,
  selectActiveModal,
  selectInSearch,
  selectIsFlexibleFlowActive,
  setInSearch,
} from 'store/utilsSlice'
import { setModifierKey } from 'utils/setModifierKey'

import NavigationMore from './More/NavigationMore'
import * as S from './NavigationStyles'

const ICON_SIZE = 18

const Navigation = () => {
  const [active, setActive] = useState<string | null>(null)
  const inSearch = useAppSelector(selectInSearch)
  const activeModal = useAppSelector(selectActiveModal)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const location = useLocation()
  const dispatch = useAppDispatch()

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

  useKeyboardShortcut({
    handleEvent: () => dispatch(setInSearch(true)),
    actionKeys: [setModifierKey, keyConstants.KEY_LETTERS.k],
    isDisabled: inSearch,
    refreshOnDeps: [inSearch],
  })
  useKeyboardShortcut({
    handleEvent: () => dispatch(push(RoutesConstants.TODO)),
    actionKeys: [setModifierKey, keyConstants.KEY_NUMBERS[1]],
    isDisabled: inSearch && !!activeModal,
  })
  useKeyboardShortcut({
    handleEvent: () => dispatch(push(RoutesConstants.INBOX)),
    actionKeys: [setModifierKey, keyConstants.KEY_NUMBERS[2]],
    isDisabled: (inSearch || !!activeModal) && !isFlexibleFlowActive,
  })
  useKeyboardShortcut({
    handleEvent: () => dispatch(push(RoutesConstants.COMPOSE_EMAIL)),
    actionKeys: [keyConstants.KEY_SPECIAL.shift, keyConstants.KEY_LETTERS.c],
    isDisabled:
      (inSearch || !!activeModal) &&
      (location.pathname.includes('compose') || isReplying || isForwarding),
  })

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

          <StyledTooltip title="More options">
            <S.NavItem>
              <NavigationMore />
            </S.NavItem>
          </StyledTooltip>
        </S.NavList>
      </S.NavControls>
    ),
    [active, isFlexibleFlowActive]
  )

  return NavControllers
}

export default Navigation

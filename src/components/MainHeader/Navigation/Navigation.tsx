import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledTooltip from 'components/Elements/StyledTooltip'
import type { ILayout } from 'components/Layout/Layout'
import { ACTIVE_PAGE_HEADER } from 'constants/globalConstants'
import * as keyConstants from 'constants/keyConstants'
import RoutesConstants from 'constants/routesConstants'
import useKeyboardShortcut from 'hooks/useKeyboardShortcut'
import {
  QiCompose,
  QiInbox,
  QiSearch,
  QiToDo,
} from 'images/svgIcons/quillIcons'
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

const Navigation = ({ activePage }: Pick<ILayout, 'activePage'>) => {
  const inSearch = useAppSelector(selectInSearch)
  const activeModal = useAppSelector(selectActiveModal)
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const location = useLocation()
  const dispatch = useAppDispatch()

  useKeyboardShortcut({
    handleEvent: () => dispatch(setInSearch(true)),
    modifierKey: setModifierKey,
    key: keyConstants.KEY_LETTERS.k,
    isDisabled: inSearch,
    refreshOnDeps: [inSearch],
  })
  useKeyboardShortcut({
    handleEvent: () => dispatch(push(RoutesConstants.TODO)),
    modifierKey: setModifierKey,
    key: keyConstants.KEY_NUMBERS[1],
    isDisabled: inSearch && !!activeModal,
  })
  useKeyboardShortcut({
    handleEvent: () => dispatch(push(RoutesConstants.INBOX)),
    modifierKey: setModifierKey,
    key: keyConstants.KEY_NUMBERS[2],
    isDisabled: (inSearch || !!activeModal) && !isFlexibleFlowActive,
  })
  useKeyboardShortcut({
    handleEvent: () => dispatch(push(RoutesConstants.COMPOSE_EMAIL)),
    modifierKey: keyConstants.KEY_SPECIAL.shift,
    key: keyConstants.KEY_LETTERS.c,
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
                isActive={activePage === ACTIVE_PAGE_HEADER.todo}
                title=""
                dataCy="todo"
              />
            </S.NavItem>
          </StyledTooltip>

          {isFlexibleFlowActive ? (
            <StyledTooltip title="Inbox">
              <S.NavItem>
                <CustomIconButton
                  icon={<QiInbox size={ICON_SIZE} />}
                  onClick={() => dispatch(navigateTo(RoutesConstants.INBOX))}
                  isActive={activePage === ACTIVE_PAGE_HEADER.inbox}
                  title=""
                  dataCy="inbox"
                />
              </S.NavItem>
            </StyledTooltip>
          ) : null}

          <StyledTooltip title="Command Palette">
            <S.NavItem>
              <CustomIconButton
                icon={<QiSearch size={ICON_SIZE} />}
                isActive={activePage === ACTIVE_PAGE_HEADER.search}
                onClick={() => dispatch(setInSearch(true))}
                title=""
                dataCy="command-palette"
              />
            </S.NavItem>
          </StyledTooltip>

          <StyledTooltip title="Compose">
            <S.NavItem>
              <CustomIconButton
                icon={<QiCompose size={ICON_SIZE} />}
                isActive={activePage === ACTIVE_PAGE_HEADER.compose}
                onClick={() => {
                  dispatch(navigateTo('/compose'))
                }}
                title=""
                dataCy="compose"
              />
            </S.NavItem>
          </StyledTooltip>

          <StyledTooltip title="More options">
            <S.NavItem>
              <NavigationMore
                isActive={activePage === ACTIVE_PAGE_HEADER.more}
              />
            </S.NavItem>
          </StyledTooltip>
        </S.NavList>
      </S.NavControls>
    ),
    [activePage, isFlexibleFlowActive]
  )

  return NavControllers
}

export default Navigation

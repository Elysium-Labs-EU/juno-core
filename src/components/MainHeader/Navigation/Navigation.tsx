import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import Stack from 'components/Elements/Stack/Stack'
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
      (inSearch || !!activeModal || location.pathname.startsWith('/mail/')) &&
      (location.pathname.includes('compose') || isReplying || isForwarding),
  })

  const NavControllers = useMemo(
    () => (
      <S.NavControls>
        <Stack spacing="huge" style={{ listStyleType: 'none' }}>
          <StyledTooltip title="To Do">
            <CustomIconButton
              dataCy="todo"
              icon={<QiToDo size={ICON_SIZE} />}
              isactive={
                activePage === ACTIVE_PAGE_HEADER.todo ? 'true' : 'false'
              }
              onClick={() => dispatch(navigateTo(RoutesConstants.TODO))}
            />
          </StyledTooltip>

          {isFlexibleFlowActive ? (
            <StyledTooltip title="Inbox">
              <CustomIconButton
                dataCy="inbox"
                icon={<QiInbox size={ICON_SIZE} />}
                isactive={
                  activePage === ACTIVE_PAGE_HEADER.inbox ? 'true' : 'false'
                }
                onClick={() => dispatch(navigateTo(RoutesConstants.INBOX))}
              />
            </StyledTooltip>
          ) : null}

          <StyledTooltip title="Command Palette">
            <CustomIconButton
              dataCy="command-palette"
              icon={<QiSearch size={ICON_SIZE} />}
              isactive={
                activePage === ACTIVE_PAGE_HEADER.search ? 'true' : 'false'
              }
              onClick={() => dispatch(setInSearch(true))}
            />
          </StyledTooltip>

          <StyledTooltip title="Compose">
            <CustomIconButton
              dataCy="compose"
              icon={<QiCompose size={ICON_SIZE} />}
              isactive={
                activePage === ACTIVE_PAGE_HEADER.compose ? 'true' : 'false'
              }
              onClick={() => {
                dispatch(navigateTo('/compose'))
              }}
            />
          </StyledTooltip>

          <StyledTooltip title="More options">
            <div>
              <NavigationMore
                isactive={
                  activePage === ACTIVE_PAGE_HEADER.more ? 'true' : 'false'
                }
              />
            </div>
          </StyledTooltip>
        </Stack>
      </S.NavControls>
    ),
    [activePage, isFlexibleFlowActive]
  )

  return NavControllers
}

export default Navigation

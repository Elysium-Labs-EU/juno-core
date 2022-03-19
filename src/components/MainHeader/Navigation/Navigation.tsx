import { useEffect, useMemo, useState } from 'react'
import * as React from 'react'
import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import {
  FiCheckSquare,
  FiMoreHorizontal,
  FiEdit,
  FiInbox,
  FiSearch,
} from 'react-icons/fi'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import * as S from './NavigationStyles'
import * as global from '../../../constants/globalConstants'
import Routes from '../../../constants/routes.json'
import { useAppDispatch } from '../../../Store/hooks'
import { setInSearch } from '../../../Store/utilsSlice'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import NavigationMore from './More/NavigationMore'

const SIZE = 16

const Navigation = () => {
  const [active, setActive] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const location = useLocation()
  const dispatch = useAppDispatch()
  const keysPressed = useMultiKeyPress()
  const open = Boolean(anchorEl)

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

  const navigateTo = (destination: string) => {
    dispatch(push(destination))
  }

  useEffect(() => {
    let mounted = true
    if (mounted && keysPressed.includes(global.KEY_ALT_LEFT)) {
      if (keysPressed.includes(global.KEY_DIGIT_1)) {
        navigateTo(Routes.HOME)
      }
      if (keysPressed.includes(global.KEY_DIGIT_2)) {
        navigateTo(Routes.INBOX)
      }
      if (keysPressed.includes(global.KEY_DIGIT_3)) {
        dispatch(setInSearch(true))
      }
      if (keysPressed.includes(global.KEY_DIGIT_4)) {
        navigateTo('/compose')
      }
    }
    return () => {
      mounted = false
    }
  }, [keysPressed])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const NavControllers = useMemo(
    () => (
      <S.NavControls>
        <S.NavList>
          <Tooltip title="To Do">
            <S.NavItem>
              <CustomIconButton
                icon={<FiCheckSquare size={SIZE} />}
                onClick={() => navigateTo(Routes.HOME)}
                isActive={active === 'todo'}
              />
            </S.NavItem>
          </Tooltip>

          <Tooltip title="Inbox">
            <S.NavItem>
              <CustomIconButton
                icon={<FiInbox size={SIZE} />}
                onClick={() => navigateTo(Routes.INBOX)}
                isActive={active === 'inbox'}
              />
            </S.NavItem>
          </Tooltip>

          <Tooltip title="Search">
            <S.NavItem>
              <CustomIconButton
                icon={<FiSearch size={SIZE} />}
                isActive={active === 'search'}
                onClick={() => dispatch(setInSearch(true))}
              />
            </S.NavItem>
          </Tooltip>

          <Tooltip title="Compose">
            <S.NavItem>
              <CustomIconButton
                icon={<FiEdit size={SIZE} />}
                isActive={active === 'compose'}
                onClick={() => navigateTo('/compose')}
              />
            </S.NavItem>
          </Tooltip>

          <S.NavItem>
            <CustomIconButton
              onClick={handleClick}
              icon={<FiMoreHorizontal size={SIZE} />}
            />
          </S.NavItem>
          <NavigationMore
            open={open}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </S.NavList>
      </S.NavControls>
    ),
    [active, open]
  )

  return NavControllers
}

export default Navigation

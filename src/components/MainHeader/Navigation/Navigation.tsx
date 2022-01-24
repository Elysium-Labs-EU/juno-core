import { useEffect, useState } from 'react'
import * as React from 'react'
import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Tooltip from '@mui/material/Tooltip'
import {
  FiCheckSquare,
  FiMoreHorizontal,
  FiEdit,
  FiInbox,
  FiSearch,
} from 'react-icons/fi'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import SubMenuHeader from '../SubMenuHeader'
import * as S from './NavigationStyles'
import Routes from '../../../constants/routes.json'
import { useAppDispatch } from '../../../Store/hooks'
import { setIsSearching } from '../../../Store/utilsSlice'

const SIZE = 16

const Navigation = () => {
  const [active, setActive] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (location.pathname.includes('inbox')) {
      setActive('inbox')
    } else if (location.pathname.includes('settings')) {
      setActive('settings')
    } else if (location.pathname.includes('compose')) {
      setActive('compose')
    } else if (location.pathname === '/') {
      setActive('todo')
    }
  }, [location])

  const navigateTo = (destination: string) => {
    dispatch(push(destination))
  }

  const handleSpecificMenu =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget)
      setShowMenu((prev) => placement !== newPlacement || !prev)
      setPlacement(newPlacement)
    }
  const popperId = showMenu ? 'navigation-more-menu' : undefined

  return (
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
              isActive={active === 'settings'}
              onClick={() => dispatch(setIsSearching(true))}
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
            onClick={handleSpecificMenu('bottom-start')}
            // aria-describedby={popperId}
            icon={<FiMoreHorizontal size={SIZE} />}
          />
        </S.NavItem>
        <Popper
          id={popperId}
          open={showMenu}
          anchorEl={anchorEl}
          placement={placement}
        >
          <SubMenuHeader />
        </Popper>
      </S.NavList>
    </S.NavControls>
  )
}

export default Navigation

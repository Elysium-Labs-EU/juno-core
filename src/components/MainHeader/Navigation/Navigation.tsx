import React, { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'
import Popper, { PopperPlacementType } from '@mui/material/Popper'
import Tooltip from '@mui/material/Tooltip'
import './Navigation.scss'
import { FiCheckSquare, FiMoreHorizontal, FiEdit, FiInbox, FiSearch } from 'react-icons/fi'
import { CustomIconLink } from '../../Elements/Buttons/Buttons'
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
    if (location) {
      if (location.pathname.includes('inbox')) {
        setActive('inbox')
      } else if (location.pathname.includes('settings')) {
        setActive('settings')
      } else if (location.pathname.includes('compose')) {
        setActive('compose')
      } else if (location.pathname === '/') {
        setActive('todo')
      }
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
  const popperId = showMenu ? 'specifc-email-popper' : undefined

  return (
    <S.NavControls>
      <S.NavList>
        <Tooltip title="To Do">
          <S.NavItem>
            <CustomIconLink
              className={active === 'todo' ? 'nav-item-selected nav-item-button' : 'nav-item-button'}
              icon={<FiCheckSquare size={SIZE} />}
              onClick={() => navigateTo(Routes.HOME)}
            />
          </S.NavItem>
        </Tooltip>

        <Tooltip title="Inbox">
          <S.NavItem>
            <CustomIconLink
              className={active === 'inbox' ? 'nav-item-selected nav-item-button' : 'nav-item-button'}
              icon={<FiInbox size={SIZE} />}
              onClick={() => navigateTo(Routes.INBOX)}
            />
          </S.NavItem>
        </Tooltip>

        <S.NavItem>
          <CustomIconLink
            className={
              active === 'settings' ? 'nav-item-selected nav-item-button' : 'nav-item-button'
            }
            icon={<FiSearch size={SIZE} />}
            onClick={() => dispatch(setIsSearching(true))}
          />
        </S.NavItem>
        <Tooltip title="Compose">
          <S.NavItem>
            <CustomIconLink
              className={
                active === 'compose' ? 'nav-item-selected nav-item-button' : 'nav-item-button'
              }
              icon={<FiEdit size={SIZE} />}
              onClick={() => navigateTo('/compose')}
            />
          </S.NavItem>
        </Tooltip>

        <S.NavItem>
          <CustomIconLink
            onClick={handleSpecificMenu('bottom-start')}
            aria-describedby={popperId}
            className="nav-item-button"
            icon={<FiMoreHorizontal size={SIZE} />}
          />
        </S.NavItem>
        <Popper id={popperId} open={showMenu} anchorEl={anchorEl} placement={placement}>
          <SubMenuHeader />
        </Popper>
      </S.NavList>
    </S.NavControls>
  )
}

export default Navigation

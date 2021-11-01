import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Popper, { PopperPlacementType } from '@material-ui/core/Popper'
import './NavControls.scss'
import { FiCheckSquare, FiMoreHorizontal, FiEdit, FiInbox } from 'react-icons/fi'
import { CustomIconLink } from '../../Elements/Buttons'
import SubMenuHeader from '../SubMenuHeader'
import * as S from './NavControlsStyles'
import * as Routes from '../../../constants/routes.json'
import { LocationObjectType } from '../../types/globalTypes'

const SIZE = 16

const Navigation = () => {
  const [active, setActive] = useState('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [placement, setPlacement] = useState<PopperPlacementType>()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const location = useLocation<LocationObjectType>()
  const history = useHistory()

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
    history.push(destination)
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
        <S.NavItem>
          <CustomIconLink
            className={active === 'todo' ? 'nav-item-selected nav-item-button' : 'nav-item-button'}
            icon={<FiCheckSquare size={SIZE} />}
            onClick={() => navigateTo(Routes.HOME)}
          />
        </S.NavItem>
        <S.NavItem>
          <CustomIconLink
            className={active === 'inbox' ? 'nav-item-selected nav-item-button' : 'nav-item-button'}
            icon={<FiInbox size={SIZE} />}
            onClick={() => navigateTo(Routes.INBOX)}
          />
        </S.NavItem>
        {/* <S.NavItem>
          <CustomIconLink
            className={
              active === 'settings' ? 'nav-item-selected nav-item-button' : 'nav-item-button'
            }
            icon={<FiSettings />}
            onClick={() => navigateTo(Routes.SETTINGS)}
          />
        </S.NavItem> */}
        <S.NavItem>
          <CustomIconLink
            className={
              active === 'compose' ? 'nav-item-selected nav-item-button' : 'nav-item-button'
            }
            icon={<FiEdit size={SIZE} />}
            onClick={() => navigateTo('/compose')}
          />
        </S.NavItem>
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

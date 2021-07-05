import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './NavControls.scss'
import {
  FiCheckSquare,
  FiMoreHorizontal,
  FiEdit,
  FiInbox,
  FiSettings,
} from 'react-icons/fi'
import { CustomIconLink } from '../../Elements/Buttons'
import SubMenuHeader from '../SubMenuHeader'
import * as S from './NavControlsStyles'

const Navigation = () => {
  const [active, setActive] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const location = useLocation()
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

  const navigateTo = (destination) => {
    history.push(destination)
  }

  return (
    <S.NavControls>
      <S.NavList>
        <S.NavItem>
          <CustomIconLink
            className={
              active === 'todo'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiCheckSquare />}
            onClick={() => navigateTo('/')}
          />
        </S.NavItem>
        <S.NavItem>
          <CustomIconLink
            className={
              active === 'inbox'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiInbox />}
            onClick={() => navigateTo('/inbox')}
          />
        </S.NavItem>
        <S.NavItem>
          <CustomIconLink
            className={
              active === 'settings'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiSettings />}
            onClick={() => navigateTo('/settings')}
          />
        </S.NavItem>
        <S.NavItem>
          <CustomIconLink
            className={
              active === 'compose'
                ? 'nav-item-selected nav-item-button'
                : 'nav-item-button'
            }
            icon={<FiEdit />}
            onClick={() => navigateTo('/compose')}
          />
        </S.NavItem>
        <S.NavItem>
          <CustomIconLink
            onClick={() => setShowMenu(!showMenu)}
            className="nav-item-button"
            icon={<FiMoreHorizontal />}
          />
        </S.NavItem>
        {showMenu && <SubMenuHeader />}
      </S.NavList>
    </S.NavControls>
  )
}

export default Navigation

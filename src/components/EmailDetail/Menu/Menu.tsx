import React, { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'
import * as S from './MenuStyles'
import * as local from '../../../constants/menuConstants'
import { selectCurrentEmail } from '../../../Store/emailDetailSlice'
import { LocationObjectType } from '../../types/globalTypes'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'

interface MenuItemType {
  name: string
  link: string
}

const Menu = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const dispatch = useAppDispatch()
  const [activeLink, setActiveLink] = useState('')
  const location = useLocation<LocationObjectType>()

  const navigateTo = (item: MenuItemType) => {
    setActiveLink(item.name)
    dispatch(push(item.link))
  }

  useEffect(() => {
    if (location.pathname.includes('messages')) {
      setActiveLink('Messages')
    }
    if (location.pathname.includes('files')) {
      setActiveLink('Files')
    }
  }, [location, currentEmail])

  const mappedMenu = local.MENU_OPTIONS && (
    <S.ItemsContainer>
      {local.MENU_OPTIONS.map((item, index) => (
        <li
          key={`${ item.name + index }`}
          className={activeLink === item.name ? 'option-link:active menu' : 'option-link menu'}
          style={{ cursor: 'pointer' }}
          onClick={() => navigateTo(item)}
          aria-hidden="true"
        >
          {item.name}
        </li>
      ))}
    </S.ItemsContainer>
  )

  return <S.MenuContainer>{mappedMenu}</S.MenuContainer>
}

export default Menu

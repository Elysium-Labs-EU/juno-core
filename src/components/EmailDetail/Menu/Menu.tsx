import React, { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'
import * as S from './MenuStyles'
import * as local from '../../../constants/menuConstants'
import { selectCurrentEmail } from '../../../Store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'

interface MenuItemType {
  name: string
  link: string
}

const Menu = () => {
  const currentEmail = useAppSelector(selectCurrentEmail)
  const dispatch = useAppDispatch()
  const [activeLink, setActiveLink] = useState('')
  const location = useLocation()

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
        <S.StyedListItem
          key={`${ item.name + index }`}
          style={{ cursor: 'pointer' }}
          onClick={() => navigateTo(item)}
          aria-hidden="true"
          isActive={activeLink === item.name}
        >
          {item.name}
        </S.StyedListItem>
      ))}
    </S.ItemsContainer>
  )

  return <S.MenuContainer>{mappedMenu}</S.MenuContainer>
}

export default Menu

import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MenuContainer } from './MenuStyles'
import * as local from '../../../constants/menuConstants'
import { selectCurrentEmail } from '../../../Store/emailDetailSlice'

const Menu = () => {
  const currentEmail = useSelector(selectCurrentEmail)
  const [activeLink, setActiveLink] = useState('Messages')
  const history = useHistory()
  const location = useLocation()

  const navigateTo = (item) => {
    setActiveLink(item.name)
    history.push(item.link)
  }

  useEffect(() => {
    if (!location.pathname.includes(currentEmail)) {
      setActiveLink('Messages')
    }
  }, [location, currentEmail])

  const mappedMenu = local.MENU_OPTIONS && (
    <ul className="no-bullet-ul flex-flow-row">
      {local.MENU_OPTIONS.map((item, index) => {
        return (
          <li
            key={`${item.name + index}`}
            className={
              activeLink === item.name
                ? 'option-link:active menu'
                : 'option-link menu'
            }
            onClick={() => navigateTo(item)}
            aria-hidden="true"
          >
            {item.name}
          </li>
        )
      })}{' '}
    </ul>
  )

  return <MenuContainer>{mappedMenu}</MenuContainer>
}

export default Menu

import { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'
import * as S from './TabsStyles'
import * as local from '../../../constants/menuConstants'
import { useAppDispatch } from '../../../Store/hooks'

interface ITabItem {
  name: string
  link: string
}

const Tabs = () => {
  const dispatch = useAppDispatch()
  const [activeLink, setActiveLink] = useState('')
  const location = useLocation()

  const navigateTo = (item: ITabItem) => {
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
  }, [location])

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

  return <S.TabContainer>{mappedMenu}</S.TabContainer>
}

export default Tabs

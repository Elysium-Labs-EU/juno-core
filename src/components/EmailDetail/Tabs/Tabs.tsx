import { useEffect, useState } from 'react'
import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'
import * as S from './TabsStyles'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  IEmailListObject,
} from '../../../store/storeTypes/emailListTypes'
import { selectViewIndex } from '../../../store/emailDetailSlice'
import MessagesTab from './MessagesTab'
import FilesTab from './FilesTab'

interface ITabItem {
  name: string
  link: string
}

const Tabs = ({
  activeEmailList,
}: {
  activeEmailList: IEmailListObject
}) => {
  const [activeLink, setActiveLink] = useState('')
  const dispatch = useAppDispatch()
  const viewIndex = useAppSelector(selectViewIndex)
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

  return (
    <S.TabContainer>
      <S.ItemsContainer>
        <MessagesTab
          activeLink={activeLink}
          navigateTo={navigateTo}
          activeThread={activeEmailList.threads[viewIndex]}
        />
        <FilesTab
          activeLink={activeLink}
          navigateTo={navigateTo}
          activeThread={activeEmailList.threads[viewIndex]}
        />
      </S.ItemsContainer>
    </S.TabContainer>
  )
}

export default Tabs

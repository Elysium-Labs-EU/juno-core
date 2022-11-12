import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'
import { selectViewIndex } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import { IEmailListObject } from 'store/storeTypes/emailListTypes'
import filterTrashMessages from 'utils/filterTrashMessages'

import FilesTab from './FilesTab'
import MessagesTab from './MessagesTab'
import * as S from './TabsStyles'

interface ITabItem {
  name: string
  link: string
}

const Tabs = ({ activeEmailList }: { activeEmailList: IEmailListObject }) => {
  const [activeLink, setActiveLink] = useState('')
  const dispatch = useAppDispatch()
  const viewIndex = useAppSelector(selectViewIndex)
  const labelIds = useAppSelector(selectLabelIds)
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
          activeThread={filterTrashMessages(
            activeEmailList.threads[viewIndex],
            labelIds
          )}
        />
        <FilesTab
          activeLink={activeLink}
          navigateTo={navigateTo}
          activeThread={filterTrashMessages(
            activeEmailList.threads[viewIndex],
            labelIds
          )}
        />
      </S.ItemsContainer>
    </S.TabContainer>
  )
}

export default Tabs

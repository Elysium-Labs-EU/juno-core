import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'

import { selectViewIndex } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { IEmailListObject } from 'store/storeTypes/emailListTypes'
import filterTrashMessages from 'utils/filterTrashMessages'

import FilesTab from './FilesTab'
import MessagesTab from './MessagesTab'
import * as S from './TabsStyles'

interface ITabItem {
  name: string
  link: string
}

const pathToActiveLink = {
  messages: 'Messages',
  files: 'Files',
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
    const determinedLink =
      pathToActiveLink[location.pathname as keyof typeof pathToActiveLink]
    if (determinedLink) {
      setActiveLink(determinedLink)
    }
  }, [location])

  const viewedThread = activeEmailList.threads[viewIndex]

  return (
    <S.TabContainer>
      <S.ItemsContainer>
        <MessagesTab
          activeLink={activeLink}
          navigateTo={navigateTo}
          activeThread={filterTrashMessages(viewedThread, labelIds)}
        />
        <FilesTab
          activeLink={activeLink}
          navigateTo={navigateTo}
          activeThread={filterTrashMessages(viewedThread, labelIds)}
        />
      </S.ItemsContainer>
    </S.TabContainer>
  )
}

export default Tabs

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'

import * as local from 'constants/menuConstants'
import { selectViewIndex } from 'store/emailDetailSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectLabelIds } from 'store/labelsSlice'
import type { TEmailListObject } from 'store/storeTypes/emailListTypes'
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

<<<<<<< #895---Build-Schema-validation
const Tabs = ({ activeEmailList }: { activeEmailList: TEmailListObject }) => {
  const [activeLink, setActiveLink] = useState('')
=======
const Tabs = ({ activeEmailList }: { activeEmailList: IEmailListObject }) => {
  const [activeLink, setActiveLink] = useState(local.MESSAGE_MENU_ITEM.name)
>>>>>>> dev
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

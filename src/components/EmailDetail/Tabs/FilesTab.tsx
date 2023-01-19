import * as local from 'constants/menuConstants'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import countUniqueFiles from 'utils/countUniqueFiles/countUniqueFiles'

import * as S from './TabsStyles'

interface IFilesTab {
  activeThread: IEmailListThreadItem | undefined | null
  activeLink: string
  navigateTo: ({ link, name }: { link: string; name: string }) => void
}

const FilesTab = ({ activeThread, activeLink, navigateTo }: IFilesTab) => (
  <S.StyedListItem
    style={{ cursor: 'pointer' }}
    onClick={() => navigateTo(local.FILES_MENU_ITEM)}
    aria-hidden="true"
    isActive={activeLink === local.FILES_MENU_ITEM.name}
  >
    <S.StyledBadge
      badgeContent={activeThread ? countUniqueFiles(activeThread) : 0}
      color="primary"
    >
      {local.FILES_MENU_ITEM.name}
    </S.StyledBadge>
  </S.StyedListItem>
)

export default FilesTab

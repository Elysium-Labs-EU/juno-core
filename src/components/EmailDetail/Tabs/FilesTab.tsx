import * as local from 'constants/menuConstants'
import { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'
import countUniqueFiles from 'utils/countUniqueFiles'

import * as S from './TabsStyles'

const FilesTab = ({
  activeThread,
  activeLink,
  navigateTo,
}: {
  activeThread: IEmailListThreadItem
  activeLink: string
  navigateTo: ({ link, name }: { link: string; name: string }) => void
}) => (
  <S.StyedListItem
    style={{ cursor: 'pointer' }}
    onClick={() => navigateTo(local.FILES_MENU_ITEM)}
    aria-hidden="true"
    isActive={activeLink === local.FILES_MENU_ITEM.name}
  >
    <S.StyledBadge
      badgeContent={countUniqueFiles(activeThread)}
      color="primary"
    >
      {local.FILES_MENU_ITEM.name}
    </S.StyledBadge>
  </S.StyedListItem>
)

export default FilesTab

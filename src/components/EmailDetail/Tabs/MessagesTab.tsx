import * as local from 'constants/menuConstants'
import type { IEmailListThreadItem } from 'store/storeTypes/emailListTypes'

import * as S from './TabsStyles'

interface IMesssageTab {
  activeThread: IEmailListThreadItem | undefined | null
  activeLink: string
  navigateTo: ({ link, name }: { link: string; name: string }) => void
}

const MessagesTab = ({
  activeThread,
  activeLink,
  navigateTo,
}: IMesssageTab) => (
  <S.StyedListItem
    style={{ cursor: 'pointer' }}
    onClick={() => navigateTo(local.MESSAGE_MENU_ITEM)}
    aria-hidden="true"
    isActive={activeLink === local.MESSAGE_MENU_ITEM.name}
  >
    <S.StyledBadge
      badgeContent={activeThread?.messages?.length ?? 0}
      color="primary"
    >
      {local.MESSAGE_MENU_ITEM.name}
    </S.StyledBadge>
  </S.StyedListItem>
)

export default MessagesTab

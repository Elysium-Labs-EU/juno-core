import * as S from './TabsStyles'
import * as local from '../../../constants/menuConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'

const MessagesTab = ({
  activeThread,
  activeLink,
  navigateTo,
}: {
  activeThread: IEmailListThreadItem
  activeLink: string
  navigateTo: Function
}) => (
  <S.StyedListItem
    style={{ cursor: 'pointer' }}
    onClick={() => navigateTo(local.MESSAGE_MENU_ITEM)}
    aria-hidden="true"
    isActive={activeLink === local.MESSAGE_MENU_ITEM.name}
  >
    <S.StyledBadge
      badgeContent={
        activeLink === local.MESSAGE_MENU_ITEM.name
          ? 0
          : activeThread?.messages?.length ?? 0
      }
      color="primary"
    >
      {local.MESSAGE_MENU_ITEM.name}
    </S.StyledBadge>
  </S.StyedListItem>
)

export default MessagesTab

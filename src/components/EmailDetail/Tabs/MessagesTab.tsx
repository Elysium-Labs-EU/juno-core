import * as S from './TabsStyles'
import * as local from '../../../constants/menuConstants'
import { IEmailListThreadItem } from '../../../store/storeTypes/emailListTypes'

const MessagesTab = ({
  activeThread,
  activeLink,
  navigateTo,
}: {
  activeThread: IEmailListThreadItem
  activeLink: string
  navigateTo: ({ link, name }: { link: string, name: string }) => void
}) => (
  <S.StyedListItem
    style={{ cursor: 'pointer' }}
    onClick={() => navigateTo(local.MESSAGE_MENU_ITEM)}
    aria-hidden="true"
    isActive={activeLink === local.MESSAGE_MENU_ITEM.name}
  >
    <S.StyledBadge
      isDimmed={activeLink === local.FILES_MENU_ITEM.name}
      badgeContent={
        activeThread?.messages?.length ?? 0
      }
      color="primary"
    >
      {local.MESSAGE_MENU_ITEM.name}
    </S.StyledBadge>
  </S.StyedListItem>
)

export default MessagesTab

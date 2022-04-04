import * as S from './TabsStyles'
import * as local from '../../../constants/menuConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import checkAttachment from '../../../utils/checkAttachment'

const FilesTab = ({
  activeThread,
  activeLink,
  navigateTo,
}: {
  activeThread: IEmailListThreadItem
  activeLink: string
  navigateTo: Function
}) => {
  const countValue = [
    ...new Set(
      activeThread?.messages?.filter(
        (message) => checkAttachment(message).length > 0
      )
    ),
  ].length

  return (
    <S.StyedListItem
      style={{ cursor: 'pointer' }}
      onClick={() => navigateTo(local.FILES_MENU_ITEM)}
      aria-hidden="true"
      isActive={activeLink === local.FILES_MENU_ITEM.name}
    >
      <S.StyledBadge
        badgeContent={
          activeLink === local.FILES_MENU_ITEM.name ? 0 : countValue
        }
        color="primary"
      >
        {local.FILES_MENU_ITEM.name}
      </S.StyledBadge>
    </S.StyedListItem>
  )
}

export default FilesTab

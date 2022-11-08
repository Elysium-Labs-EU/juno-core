import { Dispatch, SetStateAction } from 'react'
import { QiCog, QiSign, QiSignature } from '../../../images/svgIcons/quillIcons'
import * as S from './SettingsSidebarStyles'

const SETTINGS_OPTIONS = [
  { title: 'General', icon: <QiCog /> },
  { title: 'Signature', icon: <QiSignature /> },
  { title: 'Credits', icon: <QiSign /> },
]

const SettingsSidebar = ({
  focusedItemIndex,
  setFocusedItemIndex,
}: {
  focusedItemIndex: number
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
}) => (
  <S.Wrapper data-test-id="settings-menu">
    {SETTINGS_OPTIONS.map((item, index) => (
      <li
        key={item.title}
        // The className is used to target it.
        className="settings-sidebar-list-item"
      >
        <S.MenuItem
          onClick={() => setFocusedItemIndex(index)}
          active={focusedItemIndex === index}
        >
          <S.MenuItemContentSide>{item.icon}</S.MenuItemContentSide>
          <S.MenuItemContentMain>
            <span>{item.title}</span>
          </S.MenuItemContentMain>
        </S.MenuItem>
      </li>
    ))}
  </S.Wrapper>
)

export default SettingsSidebar

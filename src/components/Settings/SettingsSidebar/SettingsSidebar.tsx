import type { Dispatch, SetStateAction } from 'react'

import Stack from 'components/Elements/Stack/Stack'
import { QiCog, QiSign, QiSignature } from 'images/svgIcons/quillIcons'
import { Span } from 'styles/globalStyles'

import * as S from './SettingsSidebarStyles'

const SETTINGS_OPTIONS = [
  { title: 'General', icon: <QiCog /> },
  { title: 'Signature', icon: <QiSignature /> },
  { title: 'Credits', icon: <QiSign /> },
]

interface ISettingsSidebar {
  focusedItemIndex: number
  setFocusedItemIndex: Dispatch<SetStateAction<number>>
}

const SettingsSidebar = ({
  focusedItemIndex,
  setFocusedItemIndex,
}: ISettingsSidebar) => (
  <Stack
    direction="vertical"
    data-test-id="settings-menu"
    style={{ listStyleType: 'none' }}
  >
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
            <Span>{item.title}</Span>
          </S.MenuItemContentMain>
        </S.MenuItem>
      </li>
    ))}
  </Stack>
)

export default SettingsSidebar

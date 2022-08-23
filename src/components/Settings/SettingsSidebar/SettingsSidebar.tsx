import { FiCode, FiSettings } from 'react-icons/fi'
import * as S from './SettingsSidebarStyles'

const SETTINGS_OPTIONS = [
  { title: 'General', icon: <FiSettings /> },
  { title: 'Signature', icon: <FiCode /> },
  { title: 'Credits', icon: <FiCode /> },
]

const SettingsSidebar = ({
  activeMenuItem,
  setActiveMenuItem,
}: {
  activeMenuItem: number
  setActiveMenuItem: (value: number) => void
}) => (
  <S.Wrapper>
    {SETTINGS_OPTIONS.map((item, index) => (
      <li key={item.title}>
        <S.MenuItem
          onClick={() => setActiveMenuItem(index)}
          active={activeMenuItem === index}
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

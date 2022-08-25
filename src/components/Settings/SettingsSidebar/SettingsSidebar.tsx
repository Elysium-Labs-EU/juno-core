import { Cog, Sign, Signature } from '../../../images/svgIcons/quillIcons'
import * as S from './SettingsSidebarStyles'

const SETTINGS_OPTIONS = [
  { title: 'General', icon: <Cog /> },
  { title: 'Signature', icon: <Signature /> },
  { title: 'Credits', icon: <Sign /> },
]

const SettingsSidebar = ({
  activeMenuItem,
  setActiveMenuItem,
}: {
  activeMenuItem: number
  setActiveMenuItem: (value: number) => void
}) => (
  <S.Wrapper data-test-id="settings-menu">
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

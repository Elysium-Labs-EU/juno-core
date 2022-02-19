import * as S from './NavigationMoreStyles'
import * as local from '../../../../constants/subMenuHeaderConstants'
import CustomLink from '../../../Elements/Links/CustomLink'
import SettingsOption from './Options/SettingsOption'
import LogoutOption from './Options/LogoutOption'

const NavigationMore = () => (
  <S.Wrapper>
    <S.TopMenu>
      {local.MENU_OPTIONS &&
        local.MENU_OPTIONS.map((item, index) => (
          <S.InnerMenu key={`${item.name + index}`}>
            <CustomLink to={item.link} label={item.name} />
          </S.InnerMenu>
        ))}
    </S.TopMenu>
    <SettingsOption />
    <LogoutOption />
  </S.Wrapper>
)

export default NavigationMore

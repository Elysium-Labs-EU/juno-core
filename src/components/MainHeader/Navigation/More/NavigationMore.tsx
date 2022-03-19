import { Divider, MenuItem } from '@mui/material'
import * as GS from '../../../../styles/globalStyles'
import * as S from './NavigationMoreStyles'
import * as local from '../../../../constants/subMenuHeaderConstants'
import CustomLink from '../../../Elements/Links/CustomLink'
import SettingsOption from './Options/SettingsOption'
import LogoutOption from './Options/LogoutOption'

const NavigationMore = ({ open, handleClose, anchorEl }: any) => (
  <GS.StyledMenu
    id="navigation-more"
    open={open}
    anchorEl={anchorEl}
    onClose={handleClose}
  >
    <S.Wrapper>
      <S.TopMenuSectionWrapper>
        <S.TopMenu>
          {local.MENU_OPTIONS &&
            local.MENU_OPTIONS.map((item, index) => (
              <MenuItem key={`${item.name + index}`} onClick={handleClose}>
                <CustomLink to={item.link} label={item.name} />
              </MenuItem>
            ))}
        </S.TopMenu>
      </S.TopMenuSectionWrapper>
      <Divider variant="middle" />
      <S.BottomMenuSectionWrapper>
        <MenuItem onClick={handleClose}>
          <SettingsOption />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LogoutOption />
        </MenuItem>
      </S.BottomMenuSectionWrapper>
    </S.Wrapper>
  </GS.StyledMenu>
)

export default NavigationMore

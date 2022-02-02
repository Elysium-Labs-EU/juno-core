import * as S from './NavigationMoreStyles'
import * as local from '../../../../constants/subMenuHeaderConstants'
import CustomLink from '../../../Elements/Links/CustomLink'
import { useAppDispatch } from '../../../../Store/hooks'
import { setIsSettingsOpen } from '../../../../Store/utilsSlice'

const NavigationMore = () => {
  const dispatch = useAppDispatch()

  return (
    <S.Wrapper>
      <S.TopMenu>
        {local.MENU_OPTIONS &&
          local.MENU_OPTIONS.map((item, index) => (
            <S.InnerMenu key={`${item.name + index}`}>
              <CustomLink to={item.link} label={item.name} />
            </S.InnerMenu>
          ))}
      </S.TopMenu>
      <S.MenuItemButton
        onClick={() => dispatch(setIsSettingsOpen(true))}
        type="button"
      >
        {local.SETTINGS}
      </S.MenuItemButton>
    </S.Wrapper>
  )
}

export default NavigationMore

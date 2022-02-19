import * as S from '../NavigationMoreStyles'
import * as local from '../../../../../constants/subMenuHeaderConstants'
import { useAppDispatch } from '../../../../../Store/hooks'
import { setIsSettingsOpen } from '../../../../../Store/utilsSlice'

const SettingsOption = () => {
  const dispatch = useAppDispatch()
  return (
    <S.MenuItemButton
      onClick={() => dispatch(setIsSettingsOpen(true))}
      type="button"
    >
      {local.SETTINGS}
    </S.MenuItemButton>
  )
}

export default SettingsOption

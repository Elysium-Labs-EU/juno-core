import * as S from '../NavigationMoreStyles'
import * as local from '../../../../../constants/subMenuHeaderConstants'
import * as global from '../../../../../constants/globalConstants'
import { useAppDispatch } from '../../../../../Store/hooks'

const LogoutOption = () => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem(global.GOOGLE_TOKEN)
    // dispatch(setIsAuthenticated(false))
    window.location.reload()
  }

  return (
    <S.MenuItemButton onClick={handleLogout} type="button">
      {local.LOGOUT}
    </S.MenuItemButton>
  )
}

export default LogoutOption

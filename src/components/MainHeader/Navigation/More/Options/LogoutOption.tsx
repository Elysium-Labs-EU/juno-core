import * as S from '../NavigationMoreStyles'
import * as local from '../../../../../constants/subMenuHeaderConstants'
import * as global from '../../../../../constants/globalConstants'
import removeCookie from '../../../../../utils/Cookie/removeCookie'

const LogoutOption = () => {
  const handleLogout = () => {
    removeCookie(global.GOOGLE_TOKEN)
    window.location.reload()
  }

  return (
    <S.MenuItemButton onClick={handleLogout} type="button">
      {local.LOGOUT}
    </S.MenuItemButton>
  )
}

export default LogoutOption

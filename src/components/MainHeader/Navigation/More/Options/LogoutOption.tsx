import * as S from '../NavigationMoreStyles'
import * as local from '../../../../../constants/subMenuHeaderConstants'
import handleUserTokens from '../../../../../utils/handleUserTokens'
import userApi from '../../../../../data/userApi'

export const handleLogout = async () => {
  const response = await userApi().logoutUser()
  if (response?.status === 205) {
    handleUserTokens().removeAllTokens()
    window.location.reload()
  }
}

const LogoutOption = () => (
  <S.MenuItemButton onClick={handleLogout} type="button">
    {local.LOGOUT}
  </S.MenuItemButton>
)

export default LogoutOption

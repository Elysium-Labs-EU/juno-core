import * as S from '../NavigationMoreStyles'
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
    Logout
  </S.MenuItemButton>
)

export default LogoutOption

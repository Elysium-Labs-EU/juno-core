import { signOut } from 'supertokens-auth-react/recipe/thirdparty'
import * as S from '../NavigationMoreStyles'
import * as local from '../../../../../constants/subMenuHeaderConstants'

const LogoutOption = () => {
  const handleLogout = async () => {
    await signOut()
    window.location.reload()
  }

  return (
    <S.MenuItemButton onClick={handleLogout} type="button">
      {local.LOGOUT}
    </S.MenuItemButton>
  )
}

export default LogoutOption

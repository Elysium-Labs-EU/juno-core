import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Routes from '../../constants/routes.json'
import { resetBase } from '../../Store/baseSlice'
import { resetComposeEmail } from '../../Store/composeSlice'
import { resetDraft } from '../../Store/draftsSlice'
import { resetEmailDetail } from '../../Store/emailDetailSlice'
import { resetEmailList } from '../../Store/emailListSlice'
import { resetLabels } from '../../Store/labelsSlice'
import { resetMetaList } from '../../Store/metaListSlice'
import { resetUtils } from '../../Store/utilsSlice'

const handleLogout = ({ dispatch, history }) => {
  dispatch(resetBase())
  dispatch(resetComposeEmail())
  dispatch(resetEmailDetail())
  dispatch(resetEmailList())
  dispatch(resetDraft())
  dispatch(resetMetaList())
  dispatch(resetLabels())
  dispatch(resetUtils())
  history.push(Routes.HOME)
  localStorage.removeItem('accessToken')
}

const Logout = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <GoogleLogout
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={() => handleLogout({ dispatch, history })}
    />
  )
}

export default Logout

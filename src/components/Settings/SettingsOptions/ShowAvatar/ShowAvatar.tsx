import { FormControlLabel, Switch } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks'
import {
  setAvatarVisibility,
  setShowAvatar,
} from '../../../../Store/utilsSlice'

const showAvatarLocalStorage = localStorage.getItem('showAvatar')
const SWITCH_LABEL = 'Show avatars'

const showAvatar = () => {
  const dispatch = useAppDispatch()
  const avatarVisible = useAppSelector(setAvatarVisibility)

  useEffect(() => {
    if (
      !showAvatarLocalStorage ||
      (showAvatarLocalStorage !== 'true' && showAvatarLocalStorage !== 'false')
    ) {
      localStorage.setItem('showAvatar', 'true')
      dispatch(setShowAvatar(true))
    }
  })

  const switchAvatarView = () => {
    if (localStorage.getItem('showAvatar') === 'true') {
      localStorage.setItem('showAvatar', 'false')
      dispatch(setShowAvatar(false))
    } else {
      localStorage.setItem('showAvatar', 'true')
      dispatch(setShowAvatar(true))
    }
  }

  return (
    <FormControlLabel
      label={SWITCH_LABEL}
      control={
        <Switch
          onClick={() => switchAvatarView()}
          checked={avatarVisible}
          color="secondary"
        />
      }
    />
  )
}

export default showAvatar

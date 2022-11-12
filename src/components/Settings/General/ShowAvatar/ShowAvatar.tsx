import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectIsAvatarVisible,
  selectSettingsLabelId,
  setShowAvatar,
} from 'store/utilsSlice'
import updateSettingsLabel from 'utils/settings/updateSettingsLabel'

import { FormControlLabel, Switch } from '@mui/material'

const SWITCH_LABEL = 'Show avatars'

const ShowAvatar = () => {
  const dispatch = useAppDispatch()
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const isAvatarVisible = useAppSelector(selectIsAvatarVisible)

  const switchAvatarView = (event: any) => {
    if (!event.target.checked) {
      localStorage.setItem('showAvatar', 'false')
      dispatch(setShowAvatar(false))
      updateSettingsLabel({
        settingsLabelId,
        isAvatarVisible: false,
      })
    } else {
      localStorage.setItem('showAvatar', 'true')
      dispatch(setShowAvatar(true))
      updateSettingsLabel({
        settingsLabelId,
        isAvatarVisible: true,
      })
    }
  }

  return (
    <FormControlLabel
      label={SWITCH_LABEL}
      control={
        <Switch
          onClick={switchAvatarView}
          checked={isAvatarVisible}
          color="secondary"
        />
      }
    />
  )
}

export default ShowAvatar

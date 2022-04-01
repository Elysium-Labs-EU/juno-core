import { FormControlLabel, Switch } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks'
import {
  selectAvatarVisibility,
  selectSettingsLabelId,
  setShowAvatar,
} from '../../../../Store/utilsSlice'
import updateSettingsLabel from '../../../../utils/Settings/updateSettingsLabel'

const SWITCH_LABEL = 'Show avatars'

const showAvatar = () => {
  const dispatch = useAppDispatch()
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const avatarVisible = useAppSelector(selectAvatarVisibility)

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
          checked={avatarVisible}
          color="secondary"
        />
      }
    />
  )
}

export default showAvatar

import { FormControlLabel, Switch } from '@mui/material'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import { selectIsAvatarVisible, setShowAvatar } from 'store/utilsSlice'

const SWITCH_LABEL = 'Show avatars'

const ShowAvatar = () => {
  const dispatch = useAppDispatch()
  const isAvatarVisible = useAppSelector(selectIsAvatarVisible)

  const switchAvatarView = (event: any) => {
    if (!event.target.checked) {
      localStorage.setItem('showAvatar', 'false')
      dispatch(setShowAvatar(false))
      dispatch(
        updateSettingsLabel({
          key: 'isAvatarVisible',
          value: false,
        })
      )
    } else {
      localStorage.setItem('showAvatar', 'true')
      dispatch(setShowAvatar(true))
      dispatch(
        updateSettingsLabel({
          key: 'isAvatarVisible',
          value: true,
        })
      )
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

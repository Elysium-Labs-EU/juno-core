import Switch from 'components/Elements/Switch/Switch'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import { selectIsAvatarVisible, setShowAvatar } from 'store/utilsSlice'

const SWITCH_LABEL = 'Show avatars'
const SWITCH_ID = 'show-avatars'

const ShowAvatar = () => {
  const dispatch = useAppDispatch()
  const isAvatarVisible = useAppSelector(selectIsAvatarVisible)

  const switchAvatarView = (checked: boolean) => {
    if (!checked) {
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
    <Switch id={SWITCH_ID} checked={isAvatarVisible} onCheckedChange={(e) => switchAvatarView(e)}>{SWITCH_LABEL}</Switch>
  )
}

export default ShowAvatar

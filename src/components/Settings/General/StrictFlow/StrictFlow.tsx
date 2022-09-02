import { FormControlLabel, Switch } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  selectSettingsLabelId,
  selectIsFlexibleFlowActive,
  setFlexibleFlow,
} from '../../../../store/utilsSlice'
import updateSettingsLabel from '../../../../utils/settings/updateSettingsLabel'

const SWITCH_LABEL = 'Flexible flow'

const StrictFlow = () => {
  const dispatch = useAppDispatch()
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)

  const switchWorkFlow = (event: any) => {
    if (!event.target.checked) {
      localStorage.setItem('isFlexibleFlowActive', 'false')
      dispatch(setFlexibleFlow(false))
      updateSettingsLabel({
        settingsLabelId,
        isFlexibleFlowActive: false,
      })
    } else {
      localStorage.setItem('isFlexibleFlowActive', 'true')
      dispatch(setFlexibleFlow(true))
      updateSettingsLabel({
        settingsLabelId,
        isFlexibleFlowActive: true,
      })
    }
  }

  return (
    <FormControlLabel
      label={SWITCH_LABEL}
      control={
        <Switch
          onClick={switchWorkFlow}
          checked={isFlexibleFlowActive}
          color="secondary"
        />
      }
    />
  )
}

export default StrictFlow

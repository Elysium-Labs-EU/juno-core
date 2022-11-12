import * as S from 'components/Settings/SettingsStyles'
import { QiAlt } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectAlternateActions,
  selectSettingsLabelId,
  setAlternateActions,
} from 'store/utilsSlice'
import * as GS from 'styles/globalStyles'
import updateSettingsLabel from 'utils/settings/updateSettingsLabel'

import { FormControlLabel, Switch } from '@mui/material'

const HEADER = 'Alternate actions'
const BODY =
  'On the email detail page the application offers two options on one location. These options are stacked and can be alterated by pressing the ALT key.'
const BODY_1 = 'By default the alternative action is deprioritized.'
const SWITCH_LABEL = 'Prioritize alternate actions'

const AlternateActions = () => {
  const dispatch = useAppDispatch()
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const alternateActions = useAppSelector(selectAlternateActions)

  const alternateActionHandeler = (event: any) => {
    if (!event.target.checked) {
      localStorage.setItem('alternateActions', 'false')
      dispatch(setAlternateActions(false))
      updateSettingsLabel({
        settingsLabelId,
        alternateActions: false,
      })
    } else {
      localStorage.setItem('alternateActions', 'true')
      dispatch(setAlternateActions(true))
      updateSettingsLabel({
        settingsLabelId,
        alternateActions: true,
      })
    }
  }

  return (
    <S.PageSection>
      <p>{HEADER}</p>
      <QiAlt />
      <GS.P muted>{BODY}</GS.P>
      <GS.P muted>{BODY_1}</GS.P>
      <FormControlLabel
        label={SWITCH_LABEL}
        control={
          <Switch
            onClick={alternateActionHandeler}
            checked={alternateActions}
            color="secondary"
          />
        }
      />
    </S.PageSection>
  )
}

export default AlternateActions

import { FormControlLabel, Switch } from '@mui/material'

import SettingsSection from 'components/Settings/SettingsSection'
import { QiAlt } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import {
  selectAlternateActions,
  selectSettingsLabelId,
  setAlternateActions,
} from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import { HEADER, BODY, SWITCH_LABEL } from './AlternateActionsConstants'

const AlternateActions = () => {
  const dispatch = useAppDispatch()
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const alternateActions = useAppSelector(selectAlternateActions)

  const alternateActionHandeler = (event: any) => {
    if (!event.target.checked) {
      localStorage.setItem('alternateActions', 'false')
      dispatch(setAlternateActions(false))
      dispatch(
        updateSettingsLabel({
          settingsLabelId,
          alternateActions: 'false',
        })
      )
    } else {
      localStorage.setItem('alternateActions', 'true')
      dispatch(setAlternateActions(true))
      dispatch(
        updateSettingsLabel({
          settingsLabelId,
          alternateActions: 'true',
        })
      )
    }
  }

  return (
    <SettingsSection>
      <p>{HEADER}</p>
      <QiAlt />
      {BODY.map((content) => (
        <Paragraph muted key={content.substring(0, 5)}>
          {content}
        </Paragraph>
      ))}
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
    </SettingsSection>
  )
}

export default AlternateActions

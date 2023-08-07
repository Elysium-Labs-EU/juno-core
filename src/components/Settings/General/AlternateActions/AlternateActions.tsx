import Switch from 'components/Elements/Switch/Switch'
import SettingsSection from 'components/Settings/SettingsSection'
import { QiAlt } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import { selectAlternateActions, setAlternateActions } from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import { HEADER, BODY, SWITCH_LABEL } from './AlternateActionsConstants'

const AlternateActions = () => {
  const dispatch = useAppDispatch()
  const alternateActions = useAppSelector(selectAlternateActions)

  const alternateActionHandeler = (checked: boolean) => {
    if (!checked) {
      localStorage.setItem('alternateActions', 'false')
      dispatch(setAlternateActions(false))
      dispatch(
        updateSettingsLabel({
          key: 'alternateActions',
          value: false,
        })
      )
    } else {
      localStorage.setItem('alternateActions', 'true')
      dispatch(setAlternateActions(true))
      dispatch(
        updateSettingsLabel({
          key: 'alternateActions',
          value: true,
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
      <Switch id="alternate-actions" checked={alternateActions} onCheckedChange={(e) => alternateActionHandeler(e)}>{SWITCH_LABEL}</Switch>
    </SettingsSection>
  )
}

export default AlternateActions

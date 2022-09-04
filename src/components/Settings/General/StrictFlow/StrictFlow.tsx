import { push } from 'redux-first-history'
import { useLocation } from 'react-router-dom'

import { FormControlLabel, Switch } from '@mui/material'

import RoutesConstants from '../../../../constants/routes.json'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  selectIsFlexibleFlowActive,
  selectSettingsLabelId,
  setFlexibleFlow,
} from '../../../../store/utilsSlice'
import * as GS from '../../../../styles/globalStyles'
import updateSettingsLabel from '../../../../utils/settings/updateSettingsLabel'
import * as S from '../../SettingsStyles'

const HEADER = 'Workflow mode'
const BODY =
  'Juno has two flows - the strict flow and the flexible flow. The strict flow is enabled by default and hides your inbox.'
const SWITCH_LABEL = 'Flexible flow'

const StrictFlow = () => {
  const dispatch = useAppDispatch()
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const location = useLocation()

  const switchWorkFlow = (event: any) => {
    if (!event.target.checked) {
      localStorage.setItem('isFlexibleFlowActive', 'false')
      dispatch(setFlexibleFlow(false))
      updateSettingsLabel({
        settingsLabelId,
        isFlexibleFlowActive: false,
      })
      if (location.pathname.includes(RoutesConstants.INBOX)) {
        // In case the user is on the inbox page, redirect to user to the homepage, since the inbox page will be removed from the RoutesComponent.
        dispatch(push(RoutesConstants.HOME))
      }
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
    <S.PageSection>
      <p>{HEADER}</p>
      <GS.TextMutedParagraph>{BODY}</GS.TextMutedParagraph>
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
    </S.PageSection>
  )
}

export default StrictFlow

import * as S from 'components/Settings/SettingsStyles'
import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routes.json'
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'
import { fetchEmailsSimple } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectEmailListSize,
  selectIsFlexibleFlowActive,
  selectSettingsLabelId,
  setFlexibleFlow,
} from 'store/utilsSlice'
import * as GS from 'styles/globalStyles'
import updateSettingsLabel from 'utils/settings/updateSettingsLabel'

import { FormControlLabel, Switch } from '@mui/material'

const HEADER = 'Workflow mode'
const BODY =
  'Juno has two flows - the strict flow and the flexible flow. The strict flow is enabled by default and hides your inbox.'
const SWITCH_LABEL = 'Flexible flow'

const StrictFlow = () => {
  const dispatch = useAppDispatch()
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const location = useLocation()

  // In case the flexibleFlow is activated, rehydrate the inbox.
  const rehydrateInbox = useCallback(() => {
    const params = {
      labelIds: [global.INBOX_LABEL],
      maxResults: emailFetchSize,
      nextPageToken: null,
    }
    dispatch(fetchEmailsSimple(params))
  }, [])

  const switchWorkFlow = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      localStorage.setItem('isFlexibleFlowActive', 'false')
      dispatch(setFlexibleFlow(false))
      updateSettingsLabel({
        settingsLabelId,
        isFlexibleFlowActive: false,
      })
      if (location.pathname.includes(RoutesConstants.INBOX)) {
        // In case the user is on the inbox page, redirect to user to the homepage, since the inbox page will be removed from the RoutesComponent.
        dispatch(push(RoutesConstants.TODO))
      }
    } else {
      localStorage.setItem('isFlexibleFlowActive', 'true')
      dispatch(setFlexibleFlow(true))
      rehydrateInbox()
      updateSettingsLabel({
        settingsLabelId,
        isFlexibleFlowActive: true,
      })
    }
  }

  return (
    <S.PageSection>
      <p>{HEADER}</p>
      <GS.P muted>{BODY}</GS.P>
      <FormControlLabel
        label={SWITCH_LABEL}
        control={
          <Switch
            onChange={switchWorkFlow}
            checked={isFlexibleFlowActive}
            color="secondary"
          />
        }
      />
    </S.PageSection>
  )
}

export default StrictFlow

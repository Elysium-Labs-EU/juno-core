import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { push } from 'redux-first-history'

import Switch from 'components/Elements/Switch/Switch'
import SettingsSection from 'components/Settings/SettingsSection'
import * as global from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import { fetchEmailsSimple } from 'store/emailListSlice'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { updateSettingsLabel } from 'store/labelsSlice'
import {
  selectEmailListSize,
  selectIsFlexibleFlowActive,
  setFlexibleFlow,
} from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import { HEADER, BODY, SWITCH_LABEL, SWITCH_ID } from './StrictFlowConstants'

const StrictFlow = () => {
  const dispatch = useAppDispatch()
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const isFlexibleFlowActive = useAppSelector(selectIsFlexibleFlowActive)
  const location = useLocation()

  // In case the flexibleFlow is activated, rehydrate the inbox.
  const rehydrateInbox = useCallback(() => {
    const params = {
      labelIds: [global.INBOX_LABEL],
      maxResults: emailFetchSize,
      nextPageToken: null,
    }
    void dispatch(fetchEmailsSimple(params))
  }, [])

  const switchWorkFlow = (checked: boolean) => {
    if (!checked) {
      localStorage.setItem('isFlexibleFlowActive', 'false')
      dispatch(setFlexibleFlow(false))
      dispatch(
        updateSettingsLabel({
          key: 'isFlexibleFlowActive',
          value: false,
        })
      )
      if (location.pathname.includes(RoutesConstants.INBOX)) {
        // In case the user is on the inbox page, redirect to user to the homepage, since the inbox page will be removed from the RoutesComponent.
        dispatch(push(RoutesConstants.TODO))
      }
    } else {
      localStorage.setItem('isFlexibleFlowActive', 'true')
      dispatch(setFlexibleFlow(true))
      rehydrateInbox()
      dispatch(
        updateSettingsLabel({
          key: 'isFlexibleFlowActive',
          value: true,
        })
      )
    }
  }

  return (
    <SettingsSection>
      <Paragraph>{HEADER}</Paragraph>
      <Paragraph muted>{BODY}</Paragraph>

      <Switch id={SWITCH_ID} checked={isFlexibleFlowActive} onCheckedChange={(e) => switchWorkFlow(e)} data-cy="flexible-flow-switch">{SWITCH_LABEL}</Switch>
    </SettingsSection>
  )
}

export default StrictFlow

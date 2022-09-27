import { FormControlLabel, Switch } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import {
  selectIsSentryActive,
  setIsSentryActive,
} from '../../../../store/utilsSlice'

import * as GS from '../../../../styles/globalStyles'
import * as S from '../../SettingsStyles'

const HEADER = 'Sentry'
const BODY =
  'We are using Sentry to track bugs and errors whenever they occur, so we can fix them with useful information. This does send some anonymous data to Sentry, you may opt our here.'
const SWITCH_LABEL = 'Sentry'

const SentryToggle = () => {
  const dispatch = useAppDispatch()
  const isSentryActive = useAppSelector(selectIsSentryActive)

  const switchSentry = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      localStorage.setItem('isSentryActive', 'false')
      dispatch(setIsSentryActive(false))
    } else {
      localStorage.setItem('isSentryActive', 'true')
      dispatch(setIsSentryActive(true))
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
            onChange={switchSentry}
            checked={isSentryActive}
            color="secondary"
          />
        }
      />
    </S.PageSection>
  )
}

export default SentryToggle

import { FormControlLabel, Switch } from '@mui/material'

import * as S from 'components/Settings/SettingsStyles'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectIsSentryActive, setIsSentryActive } from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import { HEADER, BODY, SWITCH_LABEL } from './SentryToggleConstants'

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
      <Paragraph>{HEADER}</Paragraph>
      <Paragraph muted>{BODY}</Paragraph>
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

import Switch from 'components/Elements/Switch/Switch'
import * as S from 'components/Settings/SettingsStyles'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectIsSentryActive, setIsSentryActive } from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import { HEADER, BODY, SWITCH_LABEL, SWITCH_ID } from './SentryToggleConstants'

const SentryToggle = () => {
  const dispatch = useAppDispatch()
  const isSentryActive = useAppSelector(selectIsSentryActive)

  const switchSentry = (checked: boolean) => {
    if (!checked) {
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
      <Paragraph muted="true">{BODY}</Paragraph>
      <Switch
        id={SWITCH_ID}
        checked={isSentryActive}
        onCheckedChange={(e) => switchSentry(e)}
      >
        {SWITCH_LABEL}
      </Switch>
    </S.PageSection >
  )
}

export default SentryToggle

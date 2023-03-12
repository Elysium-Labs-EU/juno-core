import Stack from 'components/Elements/Stack/Stack'

import * as S from '../SettingsStyles'

const CONTRIBUTIONS = 'Credits'
const CONTRIBUTIONS_1 = 'If you want to help please check out any of these '
const CONTRIBUTIONS_2 = 'Issues.'

const Contributions = () => (
  <Stack direction="vertical">
    <S.SettingsSubHeader>{CONTRIBUTIONS}</S.SettingsSubHeader>
    <p>
      {CONTRIBUTIONS_1}{' '}
      <a
        href="https://github.com/Elysium-Labs-EU/juno-core/issues"
        target="_blank"
        rel="noreferrer noopener"
      >
        {CONTRIBUTIONS_2}
      </a>
    </p>
  </Stack>
)

export default Contributions

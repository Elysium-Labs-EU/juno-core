import type { ReactNode } from 'react'

import * as S from './SettingsStyles'

interface ISettingsSection {
  children: ReactNode
}

const SettingsSection = ({ children }: ISettingsSection) => (
  <S.PageSection>{children}</S.PageSection>
)

export default SettingsSection

import styled from 'styled-components'

export const SettingsContainer = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  gap: var(--gap-spacing-2);
  margin-bottom: var(--spacing-2);
  position: relative;
`

export const SettingsSubHeader = styled.h3`
  font-weight: 300;
  margin: 0;
`

export const PageSection = styled('div')`
  border-top: 1px solid var(--color-neutral-200);
`

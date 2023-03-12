import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const Wrapper = styled.div`
  align-items: flex-start;
  color: var(--color-neutral-400);
  display: flex;
  flex-direction: row;
  min-height: 51px;
  position: relative;
  p {
    font-size: var(--text-small);
    padding-left: var(--spacing-1-5);
  }
`

export const SettingsInner = styled.div`
  color: var(--color-white);
`

// We are using the small font size as margin to mimic the selected signatures padding
export const SettingsButtonContainer = styled.div`
  margin-top: var(--small);
  @media only screen and (min-width: ${breakPoint.xl}) {
    left: -120px;
    position: absolute;
    text-align: right;
    width: 100px;
  }
`

export const ActiveSignatureContainer = styled.div`
  position: relative;
  p {
    margin-top: 0;
    padding-left: 0;
  }
`

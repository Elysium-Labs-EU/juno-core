import styled from 'styled-components'

import { breakPoint, spacing } from 'constants/themeConstants'

export const Wrapper = styled.div`
  align-items: flex-start;
  color: var(--color-neutral-400);
  display: flex;
  flex-direction: row;
  min-height: 51px;
  position: relative;
  /* text-align: right; */
  p {
    font-size: var(--small);
    padding-left: ${spacing[1.5]};
  }
`

export const SettingsInner = styled.div`
  color: var(--color-white);
`

// We are using the small font size as margin to mimic the selected signatures padding
export const SettingsButtonContainer = styled.div`
  margin-top: var(--small);
  @media only screen and (min-width: ${breakPoint.xl}) {
    width: 100px;
    position: absolute;
    left: -120px;
    text-align: right;
  }
`

export const ActiveSignatureContainer = styled.div`
  position: relative;
`

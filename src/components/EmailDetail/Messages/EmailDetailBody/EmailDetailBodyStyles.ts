import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const ShadowStyles = styled.div`
  * {
    @media only screen and (max-width: ${breakPoint.xl}) {
      max-width: 100% !important;
      width: auto !important;
      box-sizing: border-box !important;
    }
  }
`

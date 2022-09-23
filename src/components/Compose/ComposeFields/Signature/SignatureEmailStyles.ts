import styled from 'styled-components'

export const Wrapper = styled.div`
  align-items: flex-start;
  color: var(--color-grey);
  display: flex;
  flex-flow: row;
  left: -40px;
  min-height: 51px;
  position: relative;
  /* text-align: right; */
  p {
    font-size: var(--small-size);
  }
`

export const SettingsInner = styled.div`
  color: var(--color-white);
`

// We are using the small font size as margin to mimic the selected signatures padding
export const SettingsButtonContainer = styled.div`
  margin-top: var(--small-size);
`

export const ActiveSignatureContainer = styled.div`
  position: relative;
`

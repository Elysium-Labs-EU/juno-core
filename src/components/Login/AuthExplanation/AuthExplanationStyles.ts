import styled from 'styled-components'

import Stack from 'components/Elements/Stack/Stack'

export const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

export const ContentContainer = styled.div`
  max-width: 550px;
  width: 100%;
`

export const StyledH1 = styled.h1`
  all: unset;
  font-size: var(--text-h4);
  font-weight: bold;
`

export const StyledStack = styled(Stack)`
  padding-bottom: var(--spacing-4);
`

export const Image = styled.img`
  max-height: 50px;
  object-fit: cover;
`

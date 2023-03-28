import LinearProgress from '@mui/material/LinearProgress'
import styled from 'styled-components'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  place-content: center;
  width: 100vw;
`

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  place-items: center;
`

export const ServiceUnavailableParagraph = styled.p`
  margin-bottom: var(--spacing-2);
`

export const Container = styled.div`
  img {
    border-radius: var(--radius-l);
    margin-bottom: var(--spacing-2);
    object-fit: none;
  }
`

export const LoaderContainer = styled.div`
  margin-bottom: var(--spacing-2);
  max-width: 260px;
  width: 100%;
`

export const StyledLinearProgress = styled(LinearProgress)`
  background-color: var(--color-neutral-100) !important;
  .MuiLinearProgress-bar1Indeterminate {
    background-color: var(--color-black);
  }
  .MuiLinearProgress-bar2Indeterminate {
    background-color: var(--color-black);
  }
`

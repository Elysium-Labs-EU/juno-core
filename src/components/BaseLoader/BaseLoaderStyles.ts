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
    object-fit: none;
    border-radius: var(--radius-l);
    box-shadow: 0 2px 6.7px rgba(0, 0, 0, 0.028),
      0 6.7px 22.3px rgba(0, 0, 0, 0.042), 0 30px 100px rgba(0, 0, 0, 0.07);
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

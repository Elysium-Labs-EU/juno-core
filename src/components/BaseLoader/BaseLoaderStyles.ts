import { LinearProgress } from '@mui/material'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  place-content: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`

export const Inner = styled.div`
  display: flex;
  place-items: center;
  flex-flow: column;
`

export const ServiceUnavailableParagraph = styled.p`
  margin-bottom: 40px;
`

export const Container = styled.div`
  img {
    @media (prefers-color-scheme: dark) {
      filter: invert(0);
    }
    filter: invert(100%);
    object-fit: none;
    border-radius: 10px;
    box-shadow: 0 2px 6.7px rgba(0, 0, 0, 0.028),
      0 6.7px 22.3px rgba(0, 0, 0, 0.042), 0 30px 100px rgba(0, 0, 0, 0.07);
  }
`

export const LoaderContainer = styled.div`
  max-width: 260px;
  width: 100%;
`

export const StyledLinearProgress = styled(LinearProgress)`
  background-color: var(--color-white-off) !important;
  .MuiLinearProgress-bar1Indeterminate {
    background-color: var(--color-black);
  }
  .MuiLinearProgress-bar2Indeterminate {
    background-color: var(--color-black);
  }
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-blue-oxford) !important;
    .MuiLinearProgress-bar1Indeterminate {
      background-color: var(--color-black-coral);
    }
    .MuiLinearProgress-bar2Indeterminate {
      background-color: var(--color-black-coral);
    }
  }
`

import createTheme from '@mui/material/styles/createTheme'
import styled, { createGlobalStyle } from 'styled-components'
import * as themeConstants from '../constants/themeConstants'

/* 16px */
export const GlobalStyle = createGlobalStyle`
  html {
    --box-shadow-low: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    --color-black: ${themeConstants.color.black};
    --color-blue-100: ${themeConstants.color.blue[100]};
    --color-neutral-100: ${themeConstants.color.neutral[100]};
    --color-neutral-200: ${themeConstants.color.neutral[200]};
    --color-neutral-300: ${themeConstants.color.neutral[300]};
    --color-neutral-400: ${themeConstants.color.neutral[400]};
    --color-neutral-500: ${themeConstants.color.neutral[500]};
    --color-neutral-600: ${themeConstants.color.neutral[600]};
    --color-neutral-700: ${themeConstants.color.neutral[700]};
    --color-neutral-800: ${themeConstants.color.neutral[800]};
    --color-neutral-900: ${themeConstants.color.neutral[900]};
    --color-red-500: ${themeConstants.color.red[500]};
    --color-white: ${themeConstants.color.white};
    --font-family: ${themeConstants.fontFamily};
    --h1: ${themeConstants.fontSize.h1};
    --h2: ${themeConstants.fontSize.h2};
    --h3: ${themeConstants.fontSize.h3};
    --h4: ${themeConstants.fontSize.h4};
    --h5: ${themeConstants.fontSize.h5};
    --small: ${themeConstants.fontSize.small};
    --radius-l: 8px;
    --radius-m: 4px;
    --radius-s: 2px;
    --z-index-block-layer: 1000;
    --z-index-modal: 402;
    --z-index-popover: 401;
    --z-index-top-element: 400;
    font-size: 100%;
  }
  body {
    margin: 0;
    background-color: var(--color-neutral-100) !important;
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased !important;
  }
`

export const Base = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0;
`

interface IOuterContainer {
  tabbedView?: boolean
}

export const OuterContainer = styled.div<IOuterContainer>`
  max-width: 1480px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  flex: 1 1 0%;
  display: ${({ tabbedView }) => (tabbedView ? 'flex' : 'initial')};
`

export const StyledMenu = styled.div`
  animation: fadeInUp 0.2s both;
  min-width: 260px;
  max-width: 800px;
  max-height: calc(100vh - 32px);
  overflow: auto;
  border-radius: var(--radius-l);
  background: var(--color-black);
  box-shadow: var(--box-shadow-low);
`

export const MenuPopper = styled.div`
  position: relative;
  padding: 10px;
  box-shadow: var(--box-shadow-low);
  background-color: var(--color-white);
  border-radius: var(--radius-m);
`

export const theme = createTheme({
  typography: {
    fontFamily: [
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

export const TextSmall = styled.p`
  font-size: var(--small);
`

export const TextMutedSmall = styled.p`
  color: var(--color-neutral-400);
  font-size: var(--small);
`

export const TextMutedSpan = styled.span`
  color: var(--color-neutral-400);
`
export const TextSpanSmall = styled.span`
  font-size: var(--small);
`

export const TextMutedSpanSmall = styled.span`
  color: var(--color-neutral-400);
  font-size: var(--small);
`

export const TextMutedParagraph = styled.p`
  color: var(--color-neutral-400);
`

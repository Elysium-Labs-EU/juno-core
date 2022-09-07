import createTheme from '@mui/material/styles/createTheme'
import styled, { createGlobalStyle } from 'styled-components'
import * as themeConstants from '../constants/themeConstants'

/* 16px */
export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%;
    --color-white: ${themeConstants.colorWhite};
    --color-white-off: ${themeConstants.colorOffWhite};
    --color-white-slight: ${themeConstants.colorSlightWhite};
    --color-grey-ultra-light: ${themeConstants.colorUltraLightGrey};
    --color-grey-light: ${themeConstants.colorLightGrey};
    --color-grey: ${themeConstants.colorGrey};
    --color-grey-dark: ${themeConstants.colorDarkGrey};
    --color-grey-hover: ${themeConstants.colorGreyHover};
    --color-grey-border: ${themeConstants.colorGreyBorder};
    --color-black: ${themeConstants.colorBlack};
    --color-black-off: ${themeConstants.colorOffBlack};
    --color-purple-dark: ${themeConstants.colorPurpleDark};
    --color-purple: ${themeConstants.colorPurple};
    --color-purple-soft: ${themeConstants.colorPurpleSoft};
    --color-red: ${themeConstants.colorRed};
    --color-blue: ${themeConstants.colorBlue};
    --color-blue-dark: ${themeConstants.colorBlueDark};
    --h1: ${themeConstants.h1FontSize};
    --h2: ${themeConstants.h2FontSize};
    --h3: ${themeConstants.h3FontSize};
    --h4: ${themeConstants.h4FontSize};
    --h5: ${themeConstants.h5FontSize};
    --small-size: ${themeConstants.smallFontSize};
    --font-family: ${themeConstants.fontFamily};
    --radius-s: 2px;
    --radius-m: 4px;
    --radius-l: 8px;
    --box-shadow-low: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    --z-index-top-element: 400;
    --z-index-popover: 401;
    --z-index-modal: 402;
    --z-index-block-layer: 1000;
  }
  body {
    margin: 0;
    background-color: var(--color-white-off) !important;
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
  font-size: var(--small-size);
`

export const TextMutedSmall = styled.p`
  color: var(--color-grey);
  font-size: var(--small-size);
`

export const TextMutedSpan = styled.span`
  color: var(--color-grey);
`
export const TextSpanSmall = styled.span`
  font-size: var(--small-size);
`

export const TextMutedSpanSmall = styled.span`
  color: var(--color-grey);
  font-size: var(--small-size);
`

export const TextMutedParagraph = styled.p`
  color: var(--color-grey);
`

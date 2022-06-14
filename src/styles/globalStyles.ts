import createTheme from '@mui/material/styles/createTheme'
import styled, { createGlobalStyle } from 'styled-components'
import { Menu } from '@mui/material'
import * as themeConstants from '../constants/themeConstants'
import UrbanistVariable from '../fonts/UrbanistVariableFontWght.ttf'
import UrbanistVariableItalic from '../fonts/UrbanistItalicVariableFontWght.ttf'
import RalewayVariable from '../fonts/RalewayVariableFontWght.ttf'
import RalewayVariableItalic from '../fonts/RalewayItalicVariableFontWght.ttf'

/* 16px */
export const GlobalStyle = createGlobalStyle`
    /* @font-face {
        font-family: 'Urbanist Variable';
        src: url(${UrbanistVariable}) format('truetype'),
        url(${UrbanistVariableItalic}) format('truetype');
        font-weight: 100 1000;
        font-stretch: 25% 151%;
    }
    @font-face {
        font-family: 'Raleway Variable';
        src: url(${RalewayVariable}) format('truetype'),
        url(${RalewayVariableItalic}) format('truetype');
        font-weight: 100 1000;
        font-stretch: 25% 151%;
    } */
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
  }
  body {
    background-color: var(--color-white-off) !important;
    margin: 0;
    font-family: var(--font-family) !important;
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
  display: flex;
  display: ${({ tabbedView }) => (tabbedView ? 'flex' : 'initial')};
`

export const StyledMenu = styled(Menu)`
  z-index: 1200;
`

export const MenuPopper = styled.div`
  position: relative;
  padding: 0.5rem;
  box-shadow: 0 2px 6.7px rgba(0, 0, 0, 0.028),
    0 6.7px 22.3px rgba(0, 0, 0, 0.042), 0 30px 100px rgba(0, 0, 0, 0.07);
  background-color: hsl(0, 0%, 100%);
  border-radius: 5px;
`

export const theme = createTheme({
  // breakpoints: {
  //   values: {
  //     xs: parseInt(BP.MAX_XS, 10),
  //     sm: parseInt(BP.MAX_S, 10),
  //     md: parseInt(BP.MAX_M, 10),
  //     lg: parseInt(BP.MAX_L, 10),
  //     xl: 1200,
  //   },
  // },
  typography: {
    fontFamily: [
      'Urbanist Variable',
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

export const TextMutedSmall = styled.p`
  color: var(--color-grey);
  font-size: var(--small-size);
`

export const TextMutedSpan = styled.span`
  color: var(--color-grey);
`

export const TextMutedSpanSmall = styled.span`
  color: var(--color-grey);
  font-size: var(--small-size);
`

export const TextMutedParagraph = styled.p`
  color: var(--color-grey);
`

import createTheme from '@mui/material/styles/createTheme'
import styled, { createGlobalStyle } from 'styled-components'
import * as themeConstants from '../constants/themeConstants'
import UrbanistVariable from '../fonts/UrbanistVariableFontWght.ttf'
import UrbanistVariableItalic from '../fonts/UrbanistItalicVariableFontWght.ttf'
import RalewayVariable from '../fonts/RalewayVariableFontWght.ttf'
import RalewayVariableItalic from '../fonts/RalewayItalicVariableFontWght.ttf'

/* 16px */
export const GlobalStyle = createGlobalStyle`
    @font-face {
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
    }
  html {
    font-size: 100%;
  }
  body {
    background-color: ${themeConstants.colorOffWhite} !important;
    margin: 0;
    font-family: 'Urbanist Variable', sans-serif !important;
  }
`

export const Base = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0;
`

interface IOuterContainer {
  isReplying?: boolean
}

export const OuterContainer = styled.div<IOuterContainer>`
  max-width: 1480px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  flex: 1 1 0%;
  display: flex;
  display: ${(props) => (props.isReplying ? 'flex' : 'initial')};
`

export const MenuPopper = styled.div`
  z-index: 10;
  position: relative;
  padding: 0.5rem;
  box-shadow: 0 2px 6.7px rgba(0, 0, 0, 0.028),
    0 6.7px 22.3px rgba(0, 0, 0, 0.042), 0 30px 100px rgba(0, 0, 0, 0.07);
  /* box-shadow: 0 0 10px 0 hsla(0, 0%, 0%, 0.01); */
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
  color: ${themeConstants.colorGrey};
  font-size: ${themeConstants.smallFontSize};
`

export const TextMutedSpan = styled.span`
  color: ${themeConstants.colorGrey};
`

export const TextMutedParagraph = styled.p`
  color: ${themeConstants.colorGrey};
`

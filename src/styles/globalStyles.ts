import * as themeConstants from 'constants/themeConstants'
import styled, { createGlobalStyle, css } from 'styled-components'

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
    -webkit-font-smoothing: antialiased !important;
    background-color: var(--color-neutral-100) !important;
    font-family: var(--font-family);
    margin: 0;
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

interface ITextProps {
  muted?: boolean
  small?: boolean
}

export const P = styled.p<ITextProps>`
  ${({ small }) =>
    small &&
    css`
      font-size: var(--small);
    `}
  ${({ muted }) =>
    muted &&
    css`
      color: var(--color-neutral-400);
    `}
`

export const Span = styled.span<ITextProps>`
  ${({ small }) =>
    small &&
    css`
      font-size: var(--small);
    `}
  ${({ muted }) =>
    muted &&
    css`
      color: var(--color-neutral-400);
    `}
`

import styled, { createGlobalStyle, css } from 'styled-components'

import * as themeConstants from 'constants/themeConstants'

/* 16px */
export const GlobalStyle = createGlobalStyle`
  :root {
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
    --container-max-width: ${themeConstants.containerMaxWidth};
    --font-family: ${themeConstants.fontFamily};
    --h1: ${themeConstants.fontSize.h1};
    --h2: ${themeConstants.fontSize.h2};
    --h3: ${themeConstants.fontSize.h3};
    --h4: ${themeConstants.fontSize.h4};
    --h5: ${themeConstants.fontSize.h5};
    --radius-l: 8px;
    --radius-m: 4px;
    --radius-s: 2px;
    --small: ${themeConstants.fontSize.small};
    --spacing-0-5: ${themeConstants.spacing[0.5]};
    --spacing-0-75: ${themeConstants.spacing[0.75]};
    --spacing-1-5: ${themeConstants.spacing[1.5]};
    --spacing-1: ${themeConstants.spacing[1]};
    --spacing-2: ${themeConstants.spacing[2]};
    --spacing-3: ${themeConstants.spacing[3]};
    --spacing-4: ${themeConstants.spacing[4]};
    --spacing-6: ${themeConstants.spacing[6]};
    --spacing-7: ${themeConstants.spacing[7]};
    --spacing-8: ${themeConstants.spacing[8]};
    --spacing-9: ${themeConstants.spacing[9]};
    --spacing-10: ${themeConstants.spacing[10]};
    --z-index-block-layer: 1000;
    --z-index-modal: 402;
    --z-index-popover: 401;
    --z-index-top-element: 400;
    font-size: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
  } 
  
  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: var(--color-neutral-100) !important;
    font-family: var(--font-family) !important;
    margin: 0;
    scroll-behavior: smooth;
  }
`

export const Base = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  position: relative;
`

interface IOuterContainer {
  tabbedView?: boolean
  position?: string
}

export const OuterContainer = styled.div<IOuterContainer>`
  display: ${({ tabbedView }) => (tabbedView ? 'flex' : 'initial')};
  flex: 1 1 0%;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--container-max-width);
  position: ${({ position }) => position || 'relative'};
  width: 100%;
`

interface ITextProps {
  muted?: boolean
  small?: boolean
}

export const Paragraph = styled.p<ITextProps>`
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

import styled, { createGlobalStyle, css } from 'styled-components'

import * as themeConstants from 'constants/themeConstants'

/* 16px */
export const GlobalStyle = createGlobalStyle`
  :root {
    --box-shadow-low: rgba(0, 0, 0, 0.1) 0px 0px 10px;
    --color-black: ${themeConstants.color.black};
    --color-blue-100: ${themeConstants.color.blue[100]};
    --color-blue-200: ${themeConstants.color.blue[200]};
    --color-blue-300: ${themeConstants.color.blue[300]};
    --color-blue-400: ${themeConstants.color.blue[400]};
    --color-blue-50: ${themeConstants.color.blue[50]};
    --color-blue-500: ${themeConstants.color.blue[500]};
    --color-blue-600: ${themeConstants.color.blue[600]};
    --color-blue-700: ${themeConstants.color.blue[700]};
    --color-blue-800: ${themeConstants.color.blue[800]};
    --color-blue-900: ${themeConstants.color.blue[900]};
    --color-gray-100: ${themeConstants.color.gray[100]};
    --color-gray-200: ${themeConstants.color.gray[200]};
    --color-gray-300: ${themeConstants.color.gray[300]};
    --color-gray-400: ${themeConstants.color.gray[400]};
    --color-gray-50: ${themeConstants.color.gray[50]};
    --color-gray-500: ${themeConstants.color.gray[500]};
    --color-gray-600: ${themeConstants.color.gray[600]};
    --color-gray-700: ${themeConstants.color.gray[700]};
    --color-gray-800: ${themeConstants.color.gray[800]};
    --color-gray-900: ${themeConstants.color.gray[900]};
    --color-neutral-100: ${themeConstants.color.neutral[100]};
    --color-neutral-100-03: ${themeConstants.color.neutral[100.03]};
    --color-neutral-200: ${themeConstants.color.neutral[200]};
    --color-neutral-200-06: ${themeConstants.color.neutral[200.06]};
    --color-neutral-300: ${themeConstants.color.neutral[300]};
    --color-neutral-400: ${themeConstants.color.neutral[400]};
    --color-neutral-50: ${themeConstants.color.neutral[50]};
    --color-neutral-500: ${themeConstants.color.neutral[500]};
    --color-neutral-600: ${themeConstants.color.neutral[600]};
    --color-neutral-700: ${themeConstants.color.neutral[700]};
    --color-neutral-800: ${themeConstants.color.neutral[800]};
    --color-neutral-900: ${themeConstants.color.neutral[900]};
    --color-purple-100: ${themeConstants.color.purple[100]};
    --color-purple-200: ${themeConstants.color.purple[200]};
    --color-purple-300: ${themeConstants.color.purple[300]};
    --color-purple-400: ${themeConstants.color.purple[400]};
    --color-purple-50: ${themeConstants.color.purple[50]};
    --color-purple-500: ${themeConstants.color.purple[500]};
    --color-purple-600: ${themeConstants.color.purple[600]};
    --color-purple-700: ${themeConstants.color.purple[700]};
    --color-purple-800: ${themeConstants.color.purple[800]};
    --color-purple-900: ${themeConstants.color.purple[900]};
    --color-red-100: ${themeConstants.color.red[100]};
    --color-red-200: ${themeConstants.color.red[200]};
    --color-red-300: ${themeConstants.color.red[300]};
    --color-red-400: ${themeConstants.color.red[400]};
    --color-red-50: ${themeConstants.color.red[50]};
    --color-red-500: ${themeConstants.color.red[500]};
    --color-red-600: ${themeConstants.color.red[600]};
    --color-red-700: ${themeConstants.color.red[700]};
    --color-red-800: ${themeConstants.color.red[800]};
    --color-red-900: ${themeConstants.color.red[900]};
    --color-slate-100: ${themeConstants.color.slate[100]};
    --color-slate-200: ${themeConstants.color.slate[200]};
    --color-slate-300: ${themeConstants.color.slate[300]};
    --color-slate-400: ${themeConstants.color.slate[400]};
    --color-slate-50: ${themeConstants.color.slate[50]};
    --color-slate-500: ${themeConstants.color.slate[500]};
    --color-slate-600: ${themeConstants.color.slate[600]};
    --color-slate-700: ${themeConstants.color.slate[700]};
    --color-slate-800: ${themeConstants.color.slate[800]};
    --color-slate-900: ${themeConstants.color.slate[900]};
    --color-transparent: ${themeConstants.color.transparent};
    --color-white: ${themeConstants.color.white};
    --color-zinc-100: ${themeConstants.color.zinc[100]};
    --color-zinc-200: ${themeConstants.color.zinc[200]};
    --color-zinc-300: ${themeConstants.color.zinc[300]};
    --color-zinc-400: ${themeConstants.color.zinc[400]};
    --color-zinc-50: ${themeConstants.color.zinc[50]};
    --color-zinc-500: ${themeConstants.color.zinc[500]};
    --color-zinc-600: ${themeConstants.color.zinc[600]};
    --color-zinc-700: ${themeConstants.color.zinc[700]};
    --color-zinc-800: ${themeConstants.color.zinc[800]};
    --color-zinc-900: ${themeConstants.color.zinc[900]};
    --container-max-width: ${themeConstants.containerMaxWidth};
    --font-family: ${themeConstants.fontFamily};
    --gap-spacing-0-5: ${themeConstants.gapSpacing[0.5]};
    --gap-spacing-1-5: ${themeConstants.gapSpacing[1.5]};
    --gap-spacing-1: ${themeConstants.gapSpacing[1]};
    --gap-spacing-2-5: ${themeConstants.gapSpacing[2.5]};
    --gap-spacing-2: ${themeConstants.gapSpacing[2]};
    --gap-spacing-3: ${themeConstants.gapSpacing[3]};
    --gap-spacing-4: ${themeConstants.gapSpacing[4]};
    --gap-spacing-5: ${themeConstants.gapSpacing[5]};
    --radius-l: 8px;
    --radius-m: 4px;
    --radius-s: 2px;
    --spacing-0-5: ${themeConstants.spacing[0.5]};
    --spacing-0-75: ${themeConstants.spacing[0.75]};
    --spacing-1-5: ${themeConstants.spacing[1.5]};
    --spacing-1: ${themeConstants.spacing[1]};
    --spacing-10: ${themeConstants.spacing[10]};
    --spacing-2: ${themeConstants.spacing[2]};
    --spacing-3: ${themeConstants.spacing[3]};
    --spacing-4: ${themeConstants.spacing[4]};
    --spacing-6: ${themeConstants.spacing[6]};
    --spacing-7: ${themeConstants.spacing[7]};
    --spacing-8: ${themeConstants.spacing[8]};
    --spacing-9: ${themeConstants.spacing[9]};
    --text-base: ${themeConstants.textSize.base};
    --text-h1: ${themeConstants.textSize.h1};
    --text-h2: ${themeConstants.textSize.h2};
    --text-h3: ${themeConstants.textSize.h3};
    --text-h4: ${themeConstants.textSize.h4};
    --text-h5: ${themeConstants.textSize.h5};
    --text-small: ${themeConstants.textSize.small};
    --text-xs: ${themeConstants.textSize.xs};
    --z-index-block-layer: 1000;
    --z-index-modal: 402;
    --z-index-popover: 401;
    --z-index-top-element: 400;
    font-size: 100%;
    scroll-behavior: smooth;

    @media (prefers-reduced-motion: reduce) {
      /* Disable animations when user prefers reduced motion */
      *,
      *::before,
      *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
    }
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
  } 
  
  body {
    -webkit-font-smoothing: antialiased;
    background: linear-gradient(220deg, rgba(245,245,245,1) 50%, rgba(249,216,231,0.4) 69%, rgba(206,231,254,0.4) 100%);
    min-height: 100vh;
    font-family: var(--font-family);
    margin: 0;
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
}

export const OuterContainer = styled.div<IOuterContainer>`
  display: ${({ tabbedView }) => (tabbedView ? 'flex' : 'block')};
  flex: 1 1 0%;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--container-max-width);
  width: 100%;
`

export const BACKGROUND_FADE = css`
  background: var(--color-neutral-100);
  background: linear-gradient(
    180deg,
    rgba(245, 245, 245, 1) 50%,
    rgba(245, 245, 245, 0.8632046568627451) 69%,
    rgba(0, 212, 255, 0) 100%
  );
`

interface ITextProps {
  muted?: boolean
  small?: boolean
}

export const Paragraph = styled.p<ITextProps>`
  ${({ small }) =>
    small &&
    css`
      font-size: var(--text-small);
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
      font-size: var(--text-small);
    `}
  ${({ muted }) =>
    muted &&
    css`
      color: var(--color-neutral-400);
    `}
`

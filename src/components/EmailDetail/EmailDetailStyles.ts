import styled, { css } from 'styled-components'

import { breakPoint } from 'constants/themeConstants'
import { BACKGROUND_FADE } from 'styles/globalStyles'

interface IEmailDetail {
  tabbedView?: boolean
}

const MAX_WIDTH_EMAIL_DETAIL = css<IEmailDetail>`
  max-width: min(
    100vw - 340px,
    ${({ tabbedView }) => (tabbedView ? '740px' : '860px')}
  );
  @media only screen and (max-width: ${breakPoint.lg}) {
    max-width: min(
      100vw - 200px,
      ${({ tabbedView }) => (tabbedView ? '740px' : '860px')}
    );
  }
`

export const Wrapper = styled.div<IEmailDetail>`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: ${breakPoint.lg}) {
    align-items: ${({ tabbedView }) => (tabbedView ? 'center' : 'normal')};
  }
`

export const HiddenMessagesFeed = styled.div`
  display: none;
`

export const EmailDetailWrapper = styled.div`
  display: flex;
`

export const EmailWithComposerContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  @media only screen and (max-width: ${breakPoint.lg}) {
    flex-direction: column-reverse;
  }
`

export const Scroll = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-2);
  max-height: calc(100vh - 75px);
  overflow: auto;
  scrollbar-width: none;
  width: 100%;
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`

export const EmailTopControlContainer = styled.div<IEmailDetail>`
  ${BACKGROUND_FADE};
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  ${MAX_WIDTH_EMAIL_DETAIL};
  padding-bottom: var(--spacing-2);
  padding-left: var(--spacing-1);
  padding-right: var(--spacing-1);
  position: sticky;
  top: 0;
  width: 100vw;
  z-index: var(--z-index-top-element);
`

interface ITabContainer {
  isVisible: boolean
}

export const TabContainer = styled.div<ITabContainer>`
  display: ${({ isVisible }) => (isVisible ? 'inherit' : 'none')};
`

interface IEmailWrapper {
  hideDraft?: boolean
  isDraft?: boolean
}

export const EmailClosedWrapper = styled.div<IEmailWrapper>`
  background-color: ${({ isDraft }) =>
    isDraft ? 'var(--color-purple-50)' : 'var(--color-white)'};
  border-radius: var(--radius-l);
  box-shadow: var(--box-shadow-low);
  cursor: pointer;
  display: ${({ hideDraft }) => (hideDraft ? 'none' : 'unset')};
  padding: var(--spacing-2) var(--spacing-4);
  transition: all 0.2s ease-in-out;
  transition: background-color ease-in 0.125s;

  &:hover {
    background-color: ${({ isDraft }) =>
      isDraft ? `var(--color-purple-100)` : `var(--color-neutral-200)`};
    border-radius: var(--radius-l);
  }
`
export const EmailOpenWrapper = styled.div<IEmailWrapper>`
  background-color: ${({ isDraft }) =>
    isDraft ? 'var(--color-purple-50)' : 'var(--color-white)'};
  border-radius: var(--radius-l);
  box-shadow: var(--box-shadow-low);
  display: ${({ hideDraft }) => (hideDraft ? 'none' : 'unset')};
  padding: var(--spacing-4);
  overflow: auto;
`

export const DraftHeaderControls = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--color-blue-100);
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-2);
  padding-bottom: var(--spacing-2);
`

export const Placeholder = styled.div<IEmailDetail>`
  display: ${({ tabbedView }) => (tabbedView ? 'none' : 'block')};
  width: 130px;
  @media only screen and (max-width: ${breakPoint.lg}) {
    display: none;
  }
`

export const EmailOptionsContainer = styled.div`
  min-height: 200px;
  padding-top: var(--spacing-7);
`

export const StickyOptions = styled.div`
  position: sticky;
  top: var(--spacing-8);
  width: 130px;
`

export const ClosedMessageWrapper = styled.div`
  align-items: center;
  display: grid;
  gap: var(--gap-spacing-2);
  grid-template-columns: max-content 1fr max-content;
`

export const LoadingErrorWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 50vh;
  justify-content: center;
  width: 100%;
`

export const MessageFeedComposerContainer = styled.div`
  display: flex;
`

export const EmailDetailContainer = styled.div<IEmailDetail>`
  margin-left: auto;
  margin-right: auto;
  ${MAX_WIDTH_EMAIL_DETAIL};
  position: relative;
  width: 90vw;
`

export const EmailAvatarGrid = styled.div`
  align-items: center;
  display: grid;
  gap: var(--gap-spacing-2);
  grid-template-columns: auto auto;
`

export const SpecificMenuContainer = styled.div`
  position: absolute;
  right: 40px;
  top: 50px;
  z-index: 10;
`

export const ContactsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-top: var(--spacing-2);
  margin-bottom: var(--spacing-2);
`

export const ToFromBCCInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const BlockedTrackersContainer = styled.div`
  align-items: center;
  display: flex;
  padding-top: var(--spacing-2);
  padding-bottom: var(--spacing-1);
`

export const EmailBody = styled.div`
  margin-top: var(--spacing-2);
  margin-bottom: var(--spacing-2);
`

export const ClosedAvatarSender = styled.div`
  align-content: center;
  display: flex;
`

export const ClosedSender = styled.div`
  display: flex;
  place-items: center;
  padding: 0 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const ClosedSnippet = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const EmailDetailTitle = styled.span`
  color: var(--color-black);
  font-size: var(--text-h5);
  font-weight: bold;
  line-height: 1.21;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface ISmallTextTruncated {
  showComma?: boolean
}

const commaSeperator = css`
  margin-right: var(--spacing-0-75);
  &:after {
    content: ',';
  }
`

export const SmallTextTruncated = styled.span<ISmallTextTruncated>`
  ${({ showComma }) => showComma && commaSeperator};
  font-size: var(--text-small);
  margin-right: ${({ showComma }) => (showComma ? 'var(--spacing-0-5)' : '0')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const FullContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ContactContainer = styled.div`
  margin-bottom: var(--spacing-0-5);
`

export const ComposeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
`

export const Spacer = styled.div`
  margin: var(--spacing-1) 0;
`

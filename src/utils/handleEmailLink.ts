import type { AppDispatch } from 'store/store'
import createComposeViaURL from 'utils/createComposeViaURL'

const CLICK_EMAIL = 'Click to start new mail'

/**
 * @function handleEmailLink
 * @param activeDocument
 * @param dispatch
 * Takes in the dispatch function as an argument to allow a push function to be executed.
 * The function checks the active document on elements which match the email link pattern, and modifies the match into an internal link.
 * @returns an element that has no href, an eventListener, and custom attributes.
 */

export default function handleEmailLink(
  activeDocument: HTMLDivElement | null,
  dispatch: AppDispatch
) {
  const elements = activeDocument?.shadowRoot?.querySelectorAll('a')
  if (elements && elements.length > 0) {
    elements.forEach((element) => {
      if (element.getAttribute('href')?.includes('mailto:')) {
        const mailToLink = element.getAttribute('href')
        if (mailToLink) {
          element.removeAttribute('href')
          element.addEventListener('click', () =>
            createComposeViaURL({ dispatch, mailToLink })
          )
          element.setAttribute(
            'style',
            'cursor: pointer; background: var(--color-neutral-100); border-radius: 5px; padding: 3px 6px; border: 1px solid var(--color-neutral-200); color: var(--color-black) !important;'
          )
          element.setAttribute('title', CLICK_EMAIL)
          return element
        }
      }
      return element
    })
  }
}

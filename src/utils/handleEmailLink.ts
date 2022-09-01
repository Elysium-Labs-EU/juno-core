import { push } from 'redux-first-history'
import RoutesConstants from '../constants/routes.json'
import type { AppDispatch } from '../store/store'

/**
 * @function createCompose
 * @property {object} - the object containing the params for the function.
 * @param dispatch - the function to dispatch the result with.
 * @param mailToLink - the string which is the link to email to.
 * @returns {void}
 */

const createCompose = ({
  dispatch,
  mailToLink,
}: {
  dispatch: AppDispatch
  mailToLink: string
}): void => {
  dispatch(
    push(`${RoutesConstants.COMPOSE_EMAIL}?${mailToLink.replace(':', '=')}`)
  )
}

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
            createCompose({ dispatch, mailToLink })
          )
          element.setAttribute(
            'style',
            'cursor: pointer; background: var(--color-grey-border); border-radius: 5px; padding: 3px 6px; border: 1px solid var(--color-grey-ultra-light); color: var(--color-black) !important;'
          )
          element.setAttribute('title', CLICK_EMAIL)
          return element
        }
      }
      return element
    })
  }
}

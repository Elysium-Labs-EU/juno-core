import { push } from 'redux-first-history'
import type { AppDispatch } from '../store/store'
import RoutesConstants from '../constants/routes.json'

/**
 * @function createComposeViaURL
 * @property {object} - the object containing the params for the function.
 * @param dispatch - the function to dispatch the result with.
 * @param mailToLink - the string which is the link to email to.
 * @returns {void}
 */

export default function createComposeViaURL({
  dispatch,
  mailToLink,
}: {
  dispatch: AppDispatch
  mailToLink: string
}): void {
  dispatch(
    push(`${RoutesConstants.COMPOSE_EMAIL}?${mailToLink.replace(':', '=')}`)
  )
}

import { push } from 'redux-first-history'

import { BACK_TO_EMAIL } from 'constants/globalConstants'
import RoutesConstants from 'constants/routesConstants'
import type { AppDispatch } from 'store/store'

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
    push(`${RoutesConstants.COMPOSE_EMAIL}?${mailToLink.replace(':', '=')}`, BACK_TO_EMAIL)
  )
}

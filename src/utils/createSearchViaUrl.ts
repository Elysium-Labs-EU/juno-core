import { push } from 'redux-first-history'

import type { AppDispatch } from 'store/store'
import { setInSearch } from 'store/utilsSlice'

/**
 * @function createSearchViaUrl
 * @property {object} - the object containing the params for the function.
 * @param dispatch - the function to dispatch the result with.
 * @param searchQuery - the string which is the query to search for.
 * @returns {void}
 * @description - this function is used to create a search via the url.
 */

export default function createSearchViaUrl({
  dispatch,
  searchQuery,
}: {
  dispatch: AppDispatch
  searchQuery: string
}): void {
  const url = new URL(window.location.href)
  url.searchParams.delete('q')
  url.searchParams.append('q', searchQuery)
  dispatch(push(url.href))
  dispatch(setInSearch(true))
}

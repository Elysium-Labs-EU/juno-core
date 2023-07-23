/* eslint-disable no-underscore-dangle */
import openAnchorElement from './openAnchorElement'

/**
 * @function openLinkInNewTabTauri
 * @param activeDocument
 * Hooks into the document and fetches all the elements that are 'a' elements.
 * And adds the target attribute '_blank' to the element if it is not an mail link.
 * @returns {void}
 */

export default function openLinkInNewTabTauri(
  activeDocument: HTMLDivElement | null
): void {
  const elements = activeDocument?.shadowRoot?.querySelectorAll('a')
  if (elements) {
    elements.forEach((element) => {
      if (
        element.getAttribute('href') &&
        !element.getAttribute('href')?.includes('mailto:')
      ) {
        if (window.__TAURI_METADATA__) {
          openAnchorElement({ element })
        }
      }
    })
  }
}

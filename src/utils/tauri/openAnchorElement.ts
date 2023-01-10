import { open } from '@tauri-apps/api/shell'

const tauriOpenFunction = async (event: MouseEvent) => {
  event.preventDefault()
  if (event?.currentTarget) {
    const currentTarget = event.currentTarget as HTMLAnchorElement
    await open(currentTarget.href)
  }
}

/**
 * Open an anchor element in a new window or tab.
 * @param {Object} options - The options object.
 * @param {HTMLAnchorElement} options.element - The anchor element to open.
 * @return {void}
 */

export default async function openAnchorElement({
  element,
}: {
  element: HTMLAnchorElement
}) {
  const existingOnClick = element.getAttribute('onclick')
  const tauriOpenFunctionString = tauriOpenFunction.toString()

  if (!existingOnClick || existingOnClick !== tauriOpenFunctionString) {
    element.addEventListener('click', async (event) => {
      event.preventDefault()
      if (event?.currentTarget) {
        const currentTarget = event.currentTarget as HTMLAnchorElement
        await open(currentTarget.href)
      }
    })
  }
}

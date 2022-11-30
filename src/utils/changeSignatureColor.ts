export default function changeSignatureColor(
  activeDocument: HTMLDivElement | null
) {
  const elements = activeDocument?.shadowRoot?.querySelectorAll(
    `div[class*="signature"]`
  )
  if (elements && elements.length > 0) {
    elements.forEach((element) => {
      element.setAttribute(
        'style',
        'color: var(--color-neutral-400) !important'
      )
    })
  }
}

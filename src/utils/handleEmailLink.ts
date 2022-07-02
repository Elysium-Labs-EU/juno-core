import { push } from 'redux-first-history'
import RoutesConstants from '../constants/routes.json'

const createCompose = ({
  dispatch,
  mailToLink,
}: {
  dispatch: Function
  mailToLink: string
}) => {
  dispatch(
    push(`${RoutesConstants.COMPOSE_EMAIL}?${mailToLink.replace(':', '=')}`)
  )
}

const CLICK_EMAIL = 'Click to start new mail'

export default function handleEmailLink({ dispatch }: { dispatch: Function }) {
  const elements = document.querySelectorAll('a')
  if (elements.length > 0) {
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
            'cursor: pointer; background: var(--color-grey-border); border-radius: 5px; padding: 3px 6px; border: 1px solid var(--color-grey-ultra-light)'
          )
          element.setAttribute('title', CLICK_EMAIL)
          return element
        }
      }
      return element
    })
  }
}

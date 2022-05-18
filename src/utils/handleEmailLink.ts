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
    push(
      `${RoutesConstants.COMPOSE_EMAIL_BASE}?${mailToLink.replace(':', '=')}`
    )
  )
}

export default function handleEmailLink({ dispatch }: { dispatch: Function }) {
  const elements = document.querySelectorAll('.visible a')
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
            'font-weight: bold; text-decoration: underline; cursor: pointer; color: var(--color-blue)'
          )
          return element
        }
      }
      return element
    })
  }
}

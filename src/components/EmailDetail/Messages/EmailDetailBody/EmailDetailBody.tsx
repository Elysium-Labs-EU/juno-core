import { useState } from 'react'
import root from 'react-shadow/styled-components'

import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import type {
  IPostTreatmentBody,
  IShadowBody,
  IEmailDetailBody,
} from 'components/EmailDetail/EmailDetailTypes'
import { useAppDispatch } from 'store/hooks'
import handleEmailLink from 'utils/handleEmailLink'
import openLinkInNewTabTauri from 'utils/openLinkInNewTabTauri'
import sanitizeAndParseHtmlContent from 'utils/sanitizeAndParseHtmlContent'

import Wrapper from './EmailDetailBodyStyles'

/**
 * @function postTreatmentBody
 * @param {object} - takes in the dispatch function and setUnsubscribeLink function as callback functions
 * The function will run on the visible document (email) and can only run once, due to the hasRan variable
 * @return {void}
 */
// TODO: Move all of these functions to the backend. And have the frontend send a header that will indicate if it is Tauri or not.
const postTreatmentBody = ({
  dispatch,
  activeDocument,
}: IPostTreatmentBody): void => {
  openLinkInNewTabTauri(activeDocument)
  handleEmailLink(activeDocument, dispatch)
}

// Use the shadowRoot body and trigger all the postTreatment functions
// Otherwise just return an empty div
const ShadowBody = ({ email }: IShadowBody) => {
  const dispatch = useAppDispatch()
  const [enhancedBody, setEnhancedBody] = useState(false)

  const callbackRef = (node: HTMLDivElement | null) => {
    // A hack to rerender the component, to get the postTreatmentBody active on the rendered html
    if (!enhancedBody) {
      setEnhancedBody(true)
    }
    if (node && node.shadowRoot && node.shadowRoot.innerHTML.length > 0) {
      postTreatmentBody({ dispatch, activeDocument: node })
    }
  }
  return (
    // TODO: This is a temporary fix.
    // @ts-ignore
    <root.div ref={callbackRef}>{sanitizeAndParseHtmlContent(email)}</root.div>
  )
}

const EmailDetailBody = ({
  threadDetailBody,
  detailBodyCSS,
}: IEmailDetailBody) => {
  const bodyState =
    'body' in threadDetailBody ? threadDetailBody.body : undefined
  const email = bodyState?.emailHTML || null
  const emailFiles = bodyState?.emailFileHTML || []

  return (
    <div className={detailBodyCSS}>
      {!bodyState && (
        <Wrapper>
          <StyledCircularProgress size={20} />
        </Wrapper>
      )}
      {email && email.length > 0 && <ShadowBody email={email} />}
      {emailFiles.map((emailFile, index) => {
        const { mimeType, decodedB64, filename } = emailFile
        if (mimeType && decodedB64) {
          return (
            <img
              key={`${filename + index}`}
              src={`data:${mimeType};base64,${decodedB64}`}
              alt={filename || 'embedded image'}
              style={{ maxWidth: '100%', borderRadius: 'var(--border-m)' }}
            />
          )
        }
        return null
      })}
    </div>
  )
}

export default EmailDetailBody

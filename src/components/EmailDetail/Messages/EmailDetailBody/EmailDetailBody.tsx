import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import root from 'react-shadow/styled-components'

import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import { useAppDispatch } from 'store/hooks'
import type { AppDispatch } from 'store/store'
import changeSignatureColor from 'utils/changeSignatureColor'
import cleanLink from 'utils/cleanLink'
import fetchUnsubscribeLink from 'utils/fetchUnsubscribeLink'
import handleEmailLink from 'utils/handleEmailLink'
import openLinkInNewTab from 'utils/openLinkInNewTab'
import sanitizeAndParseHtmlContent from 'utils/sanitizeAndParseHtmlContent'

import Wrapper from './EmailDetailBodyStyles'

interface IEmailDetailBody {
  threadDetailBody: any
  // threadDetailBody: IEmailMessagePayload
  detailBodyCSS: 'visible' | 'invisible'
  setUnsubscribeLink?: Dispatch<SetStateAction<string | null>>
  setBlockedTrackers?: Dispatch<SetStateAction<string[] | []>>
}

interface IBodyState {
  emailHTML: string
  emailFileHTML: any[]
  removedTrackers: string[] | []
}

/**
 * @function postTreatmentBody
 * @param {object} - takes in the dispatch function and setUnsubscribeLink function as callback functions
 * The function will run on the visible document (email) and can only run once, due to the hasRan variable
 * @return {void}
 */
const postTreatmentBody = ({
  dispatch,
  setUnsubscribeLink,
  activeDocument,
}: {
  dispatch: AppDispatch
  setUnsubscribeLink?: Dispatch<SetStateAction<string | null>>
  activeDocument: HTMLDivElement | null
}): void => {
  openLinkInNewTab(activeDocument)
  handleEmailLink(activeDocument, dispatch)
  cleanLink()
  changeSignatureColor(activeDocument)
  // Only fetch the unsubscribe link if there isn't one passed from the backend - the setUnsubscribe callback will be undefined if backend provided link already.
  setUnsubscribeLink && fetchUnsubscribeLink(activeDocument, setUnsubscribeLink)
}

// Use the shadowRoot body and trigger all the postTreatment functions
// Otherwise just return an empty div
const ShadowBody = ({
  bodyState,
  setUnsubscribeLink = undefined,
}: {
  bodyState: IBodyState
  setUnsubscribeLink?: Dispatch<SetStateAction<string | null>>
}) => {
  const dispatch = useAppDispatch()
  const [enhancedBody, setEnhancedBody] = useState(false)

  const callbackRef = (node: HTMLDivElement | null) => {
    // A hack to rerender the component, to get the postTreatmentBody active on the rendered html
    if (!enhancedBody) {
      setEnhancedBody(true)
    }
    if (node && node.shadowRoot && node.shadowRoot.innerHTML.length > 0) {
      postTreatmentBody({ dispatch, setUnsubscribeLink, activeDocument: node })
    }
  }

  return (
    <root.div ref={callbackRef}>
      {sanitizeAndParseHtmlContent(bodyState.emailHTML)}
    </root.div>
  )
}

const EmailDetailBody = ({
  threadDetailBody,
  detailBodyCSS,
  setUnsubscribeLink = undefined,
  setBlockedTrackers = undefined,
}: IEmailDetailBody) => {
  const [bodyState, setBodyState] = useState<null | IBodyState>(null)
  const [isDecoding, setIsDecoding] = useState(true)
  const [fallbackUnsubscribe, setFallbackUnsubscribe] = useState(true)

  useEffect(() => {
    if (threadDetailBody?.body) {
      setBodyState(threadDetailBody.body)
      if (setUnsubscribeLink && threadDetailBody?.headers?.listUnsubscribe) {
        setUnsubscribeLink(threadDetailBody?.headers?.listUnsubscribe)
        setFallbackUnsubscribe(false)
      }
      if (setBlockedTrackers && threadDetailBody?.body?.removedTrackers) {
        setBlockedTrackers(threadDetailBody?.body?.removedTrackers)
      }
      setIsDecoding(false)
    }
  }, [threadDetailBody])

  return (
    <div className={detailBodyCSS}>
      {isDecoding && (
        <Wrapper>
          <StyledCircularProgress size={20} />
        </Wrapper>
      )}
      {!isDecoding &&
        bodyState?.emailHTML &&
        bodyState.emailHTML.length > 0 && (
          <ShadowBody
            bodyState={bodyState}
            setUnsubscribeLink={
              // The fallback option will be active whenever the email from the backend doesn't have the unsubscribeLink header
              fallbackUnsubscribe ? setUnsubscribeLink : undefined
            }
          />
        )}
      {!isDecoding &&
        bodyState?.emailFileHTML &&
        bodyState?.emailFileHTML.length > 0 &&
        bodyState.emailFileHTML.map(
          (item, itemIdx) =>
            Object.prototype.hasOwnProperty.call(item, 'mimeType') &&
            Object.prototype.hasOwnProperty.call(item, 'decodedB64') && (
              <img
                key={`${item.filename + itemIdx}`}
                src={`data:${item.mimeType};base64,${item.decodedB64}`}
                alt={item?.filename ?? 'embedded image'}
                style={{ maxWidth: '100%', borderRadius: '5px' }}
              />
            )
        )}
    </div>
  )
}

export default EmailDetailBody

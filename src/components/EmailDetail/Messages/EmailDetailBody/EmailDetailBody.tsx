import { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import root from 'react-shadow/styled-components'
import { useAppDispatch } from '../../../../store/hooks'
import { IEmailMessagePayload } from '../../../../store/storeTypes/emailListTypes'
import bodyDecoder from '../../../../utils/bodyDecoder/bodyDecoder'
import openLinkInNewTab from '../../../../utils/openLinkInNewTab'
import cleanLink from '../../../../utils/cleanLink'
import handleEmailLink from '../../../../utils/handleEmailLink'
import fetchUnsubscribeLink from '../../../../utils/fetchUnsubscribeLink'
import StyledCircularProgress from '../../../Elements/StyledCircularProgress'
import Wrapper from './EmailDetailBodyStyles'
import { AppDispatch } from '../../../../store/store'

interface IEmailDetailBody {
  threadDetailBody: IEmailMessagePayload
  messageId: string
  detailBodyCSS: 'visible' | 'invisible'
  setUnsubscribeLink?: (value: string | null) => void
  setContentRendered?: (value: boolean) => void
  setBlockedTrackers?: (value: Attr[] | []) => void
}

interface IBodyState {
  emailHTML: string
  emailFileHTML: any[]
  removedTrackers: Attr[] | []
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
  activeDocument
}: {
  dispatch: AppDispatch
  setUnsubscribeLink: (value: string | null) => void
  activeDocument: HTMLDivElement | null
}): void => {
  openLinkInNewTab(activeDocument)
  handleEmailLink(activeDocument, dispatch)
  cleanLink()
  fetchUnsubscribeLink(activeDocument, setUnsubscribeLink)
}

// Use the shadowRoot body and trigger all the postTreatment functions
// Otherwise just return an empty div

const ShadowBody = ({ isDecoding, bodyState, setUnsubscribeLink }: { isDecoding: boolean, bodyState: null | IBodyState, setUnsubscribeLink?: (value: string | null) => void }) => {
  const dispatch = useAppDispatch()

  const callbackRef = (node: HTMLDivElement | null) => {
    if (node && node.shadowRoot && setUnsubscribeLink) {
      postTreatmentBody({ dispatch, setUnsubscribeLink, activeDocument: node })
    }
  }

  if (
    !isDecoding &&
    bodyState?.emailHTML &&
    bodyState.emailHTML.length > 0
  ) {
    return <root.div ref={callbackRef}>{ReactHtmlParser(bodyState.emailHTML)}</root.div>

  }
  return <div />
}

ShadowBody.defaultProps = {
  setUnsubscribeLink: null,
}

const EmailDetailBody = ({
  threadDetailBody,
  messageId,
  detailBodyCSS,
  setUnsubscribeLink,
  setContentRendered,
  setBlockedTrackers,
}: IEmailDetailBody) => {
  const [bodyState, setBodyState] = useState<null | IBodyState>(null)
  const [isDecoding, setIsDecoding] = useState(true)

  useEffect(() => {
    let mounted = true
    const controller = new AbortController()
    const { signal } = controller
    if (messageId.length > 0) {
      if (mounted) {
        const decoding = async () => {
          try {
            const bodyResponse = await bodyDecoder({
              messageId,
              inputObject: threadDetailBody,
              decodeImage: true,
              signal,
            })
            mounted && setBodyState(bodyResponse)
            if (setContentRendered && mounted) {
              setContentRendered(true)
            }
            if (setBlockedTrackers && bodyResponse.removedTrackers && mounted) {
              setBlockedTrackers(bodyResponse.removedTrackers)
            }
            mounted && setIsDecoding(false)
          } catch (err) {
            if (setContentRendered) {
              setContentRendered(true)
              setBodyState({
                emailHTML: '<p>Something went wrong during the decoding</p>',
                emailFileHTML: [],
                removedTrackers: [],
              })
            }
          }
        }
        decoding()
      }
    }
    return () => {
      mounted = false
      if (isDecoding) {
        controller.abort()
      }
    }
  }, [messageId, isDecoding])

  return (
    <div className={detailBodyCSS}>
      {isDecoding && (
        <Wrapper>
          <StyledCircularProgress size={20} />
        </Wrapper>
      )}
      <ShadowBody isDecoding={isDecoding} bodyState={bodyState} setUnsubscribeLink={setUnsubscribeLink} />
      {!isDecoding &&
        bodyState?.emailFileHTML &&
        bodyState.emailFileHTML.length > 0 &&
        bodyState.emailFileHTML.map(
          (item, itemIdx) =>
            Object.prototype.hasOwnProperty.call(item, 'mimeType') &&
            Object.prototype.hasOwnProperty.call(item, 'decodedB64') && (
              <img
                key={`${ item.filename + itemIdx }`}
                src={`data:${ item.mimeType };base64,${ item.decodedB64 }`}
                alt={item?.filename ?? 'embedded image'}
                style={{ maxWidth: '100%', borderRadius: '5px' }}
              />
            )
        )}
    </div>
  )
}

EmailDetailBody.defaultProps = {
  setUnsubscribeLink: null,
  setContentRendered: null,
  setBlockedTrackers: null,
}

export default EmailDetailBody

import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { useAppDispatch } from '../../../../Store/hooks'
import { IEmailMessagePayload } from '../../../../Store/storeTypes/emailListTypes'
import bodyDecoder from '../../../../utils/bodyDecoder'
import openLinkInNewTab from '../../../../utils/openLinkInNewTab'
import cleanLink from '../../../../utils/cleanLink'
import handleEmailLink from '../../../../utils/handleEmailLink'
import fetchUnsubscribeLink from '../../../../utils/fetchUnsubscribeLink'
import StyledCircularProgress from '../../../Elements/StyledCircularProgress'
import Wrapper from './EmailDetailBodyStyles'

interface IEmailDetailBody {
  threadDetailBody: IEmailMessagePayload
  messageId: string
  detailBodyCSS: 'visible' | 'invisible'
  setUnsubscribeLink?: Function
  setContentRendered?: (value: boolean) => void
  setBlockedTrackers?: (value: Attr[] | []) => void
}

let hasRan = false

const postTreatmentBody = ({
  dispatch,
  setUnsubscribeLink,
}: {
  dispatch: Function
  setUnsubscribeLink: Function
}) => {
  openLinkInNewTab()
  handleEmailLink({ dispatch })
  cleanLink()
  fetchUnsubscribeLink({ setUnsubscribeLink })
  hasRan = true
}

const EmailDetailBody = ({
  threadDetailBody,
  messageId,
  detailBodyCSS,
  setUnsubscribeLink,
  setContentRendered,
  setBlockedTrackers,
}: IEmailDetailBody) => {
  const [bodyState, setBodyState] = useState<null | {
    emailHTML: HTMLElement
    emailFileHTML: any[]
    removedTrackers: Attr[] | []
  }>(null)
  const dispatch = useAppDispatch()
  const [isDecoding, setIsDecoding] = useState(true)

  useEffect(() => {
    hasRan = false
  }, [window.location])

  useEffect(() => {
    let mounted = true
    if (messageId.length > 0) {
      if (mounted) {
        const decoding = async () => {
          const bodyResponse = await bodyDecoder({
            messageId,
            inputObject: threadDetailBody,
            decodeImage: true,
          })
          setBodyState(bodyResponse)
          if (setContentRendered && setUnsubscribeLink && !hasRan) {
            setContentRendered(true)
            postTreatmentBody({ dispatch, setUnsubscribeLink })
          }
          if (setBlockedTrackers && bodyResponse.removedTrackers) {
            setBlockedTrackers(bodyResponse.removedTrackers)
          }
          setIsDecoding(false)
        }
        decoding()
      }
    }
    return () => {
      mounted = false
    }
  }, [messageId])

  return (
    <div className={detailBodyCSS}>
      {isDecoding && (
        <Wrapper>
          <StyledCircularProgress size={20} />
        </Wrapper>
      )}
      {!isDecoding &&
        bodyState &&
        bodyState.emailFileHTML &&
        bodyState.emailFileHTML.length > 0 &&
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
      {!isDecoding &&
        bodyState &&
        bodyState.emailHTML &&
        bodyState.emailHTML.childNodes.length > 0 && (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(bodyState.emailHTML, {
                USE_PROFILES: { html: true },
              }),
            }}
          />
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

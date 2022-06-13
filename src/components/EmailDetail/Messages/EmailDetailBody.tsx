import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { useAppDispatch } from '../../../Store/hooks'
import { IEmailMessagePayload } from '../../../Store/storeTypes/emailListTypes'
import bodyDecoder from '../../../utils/bodyDecoder'
import openLinkInNewTab from '../../../utils/openLinkInNewTab'
import cleanLink from '../../../utils/cleanLink'
import handleEmailLink from '../../../utils/handleEmailLink'
import fetchUnsubscribeLink from '../../../utils/fetchUnsubscribeLink'

interface IEmailDetailBody {
  threadDetailBody: IEmailMessagePayload
  messageId: string
  detailBodyCSS: 'visible' | 'invisible'
  setUnsubscribeLink?: Function
  setContentRendered?: (value: boolean) => void
}

let hasRan = false

const EmailDetailBody = ({
  threadDetailBody,
  messageId,
  detailBodyCSS,
  setUnsubscribeLink,
  setContentRendered,
}: IEmailDetailBody) => {
  const [bodyState, setBodyState] = useState<any[]>([])
  const dispatch = useAppDispatch()

  useEffect(() => {
    hasRan = false
  }, [window.location])

  useEffect(() => {
    let mounted = true
    if (mounted && !hasRan && bodyState.length > 0) {
      openLinkInNewTab()
      handleEmailLink({ dispatch })
      cleanLink()
      setUnsubscribeLink && fetchUnsubscribeLink({ setUnsubscribeLink })
      hasRan = true
    }
    return () => {
      mounted = false
    }
  }, [bodyState])

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
          if (setContentRendered) {
            setContentRendered(true)
          }
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
      {bodyState.length > 0 &&
        bodyState.map((item, itemIdx) =>
          Object.prototype.hasOwnProperty.call(item, 'mimeType') &&
          Object.prototype.hasOwnProperty.call(item, 'decodedB64') ? (
            <img
              key={`${item.filename + itemIdx}`}
              src={`data:${item.mimeType};base64,${item.decodedB64}`}
              alt={item?.filename ?? 'embedded image'}
              style={{ maxWidth: '100%', borderRadius: '5px' }}
            />
          ) : (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={itemIdx}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item, {
                  USE_PROFILES: { html: true },
                }),
              }}
            />
          )
        )}
    </div>
  )
}

EmailDetailBody.defaultProps = {
  setUnsubscribeLink: null,
  setContentRendered: null,
}

export default EmailDetailBody

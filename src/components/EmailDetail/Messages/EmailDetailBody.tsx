import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import DOMPurify from 'dompurify'
import { fetchAttachment } from '../../../Store/emailDetailSlice'
import { useAppDispatch } from '../../../Store/hooks'
import { IEmailMessagePayload } from '../../../Store/emailListTypes'
import { IEmailAttachmentType } from '../Attachment/EmailAttachmentTypes'
import bodyDecoder from '../../../utils/bodyDecoder'
import openLinkInNewTab from '../../../utils/openLinkInNewTab'
import cleanLink from '../../../utils/cleanLink'
import handleEmailLink from '../../../utils/handleEmailLink'

interface IInlineImageTypeResponse {
  mimeType: string
  decodeB64: string
  filename: string
}

interface IEmailDetailBody {
  threadDetailBody: IEmailMessagePayload
  messageId: string
  detailBodyCSS: 'visible' | 'invisible'
}

const EmailDetailBody = ({
  threadDetailBody,
  messageId,
  detailBodyCSS,
}: IEmailDetailBody) => {
  const [bodyState, setBodyState] = useState<any[]>([])
  const [transformedLinks, setTransformedLinks] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true
    if (bodyState.length > 0) {
      mounted && cleanLink()
    }
    return () => {
      mounted = false
    }
  }, [bodyState])

  useEffect(() => {
    let mounted = true
    if (bodyState.length > 0 && !transformedLinks) {
      mounted && openLinkInNewTab()
      mounted && handleEmailLink()
      setTransformedLinks(true)
    }
    return () => {
      mounted = false
    }
  }, [bodyState, transformedLinks])

  useEffect(() => {
    let mounted = true
    if (messageId.length > 0) {
      const inlineImage = (attachmentData: IEmailAttachmentType) => {
        dispatch(fetchAttachment({ attachmentData, messageId })).then(
          (response: IInlineImageTypeResponse) => {
            if (response && mounted) {
              setBodyState((currState) => [...currState, response])
            }
          }
        )
      }
      const bodyResponse = bodyDecoder({
        inputObject: threadDetailBody,
        inlineImage,
      })
      if (mounted) {
        setBodyState(bodyResponse)
      }
    }
    return () => {
      mounted = false
    }
  }, [messageId])

  return (
    <div className={detailBodyCSS}>
      {!isEmpty(bodyState) &&
        bodyState[0] &&
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

export default EmailDetailBody

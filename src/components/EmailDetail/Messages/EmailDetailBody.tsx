import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import DOMPurify from 'dompurify'
import { fetchAttachment } from '../../../Store/emailDetailSlice'
import { useAppDispatch } from '../../../Store/hooks'
import { IEmailMessagePayload } from '../../../Store/storeTypes/emailListTypes'
import { IEmailAttachmentType } from '../Attachment/EmailAttachmentTypes'
import bodyDecoder from '../../../utils/bodyDecoder'
import openLinkInNewTab from '../../../utils/openLinkInNewTab'
import cleanLink from '../../../utils/cleanLink'
import handleEmailLink from '../../../utils/handleEmailLink'
import fetchUnsubscribeLink from '../../../utils/fetchUnsubscribeLink'

interface IInlineImageTypeResponse {
  mimeType: string
  decodeB64: string
  filename: string
}

interface IEmailDetailBody {
  threadDetailBody: IEmailMessagePayload
  messageId: string
  detailBodyCSS: 'visible' | 'invisible'
  setUnsubscribeLink?: Function
}

let hasRan = false
let testString = ''

const EmailDetailBody = ({
  threadDetailBody,
  messageId,
  detailBodyCSS,
  setUnsubscribeLink,
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

  if (messageId === '180c94ea1812d4fa' && hasRan === false) {
    console.log(messageId, threadDetailBody)
  }

  useEffect(() => {
    let mounted = true
    if (messageId.length > 0) {
      if (mounted) {
        const inlineImageDecoder = (attachmentData: IEmailAttachmentType) => {
          console.log('attachmentData', attachmentData)
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
          inlineImageDecoder,
        })
        console.log(bodyResponse)
        setBodyState((currState) => [...currState, bodyResponse])
      }
    }
    return () => {
      mounted = false
    }
  }, [messageId])

  // TODO: Replace the cid values with the inline images that are found.
  useEffect(() => {
    for (let i = 0; i < bodyState.length; i += 1) {
      if (Array.isArray(bodyState[i])) {
        console.log('here', bodyState[i])
        testString = bodyState[i]
      } else {
        console.log(
          'NOT HERE',
          bodyState.filter((item) => !Array.isArray(item))
        )
      }
    }
  }, [bodyState])

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

EmailDetailBody.defaultProps = {
  setUnsubscribeLink: null,
}

export default EmailDetailBody

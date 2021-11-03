import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import DOMPurify from 'dompurify'
import { fetchAttachment } from '../../../Store/emailDetailSlice'
import { decodeBase64 } from '../../../utils/decodeBase64'
import { useAppDispatch } from '../../../Store/hooks'
import { EmailMessagePayload } from '../../../Store/emailListTypes'

interface InlineImageType {
  mimeType: string
  decodeB64: string
  filename: string
}

const EmailDetailBody = ({
  threadDetailBody,
  messageId,
}: {
  threadDetailBody: EmailMessagePayload
  messageId: string
}) => {
  const [bodyState, setBodyState] = useState<any[]>([])
  const dispatch = useAppDispatch()

  const inlineImage = () => {
    const attachmentData = threadDetailBody.parts[threadDetailBody.parts.length - 1]
    dispatch(fetchAttachment({ attachmentData, messageId })).then((response: InlineImageType) => {
      setBodyState((currState) => [...currState, response])
    })
  }

  // This function recursively loops in the emailbody to find a body to decode.
  const bodyDecoder = (inputObject: any) => {
    Object.keys(inputObject).forEach((key) => {
      if (inputObject.body.size > 0) {
        if (key === 'body') {
          const str = decodeBase64(`${ inputObject.body.data }`)
          setBodyState((currState) => [...currState, str])
        }
      }
      if (inputObject.body.size === 0) {
        if (key === 'parts') {
          if (inputObject.parts[inputObject.parts.length - 1].body.size === 0) {
            bodyDecoder(inputObject.parts[inputObject.parts.length - 1])
          }
          if (inputObject.parts[inputObject.parts.length - 1].body.size > 0) {
            if (inputObject.parts[inputObject.parts.length - 1].filename.length === 0) {
              const str = decodeBase64(
                `${ inputObject.parts[inputObject.parts.length - 1].body.data }`
              )
              setBodyState((currState) => [...currState, str])
            }
            if (inputObject.parts[inputObject.parts.length - 1].filename.length > 0) inlineImage()
          }
        }
      }
    })
  }

  useEffect(() => {
    let mounted = true
    if (messageId.length > 0) {
      if (mounted) {
        bodyDecoder(threadDetailBody)
      }
    }
    return () => {
      mounted = false
    }
  }, [messageId])

  return (
    <>
      {!isEmpty(bodyState) &&
        bodyState.map((item, itemIdx) =>
          Object.prototype.hasOwnProperty.call(item, 'mimeType') &&
            Object.prototype.hasOwnProperty.call(item, 'decodedB64') ? (
            <img
              key={`${ item.filename + itemIdx }`}
              src={`data:${ item.mimeType };base64,${ item.decodedB64 }`}
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
    </>
  )
}

export default EmailDetailBody

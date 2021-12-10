import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import DOMPurify from 'dompurify'
import { fetchAttachment } from '../../../Store/emailDetailSlice'
import { decodeBase64 } from '../../../utils/decodeBase64'
import { useAppDispatch } from '../../../Store/hooks'
import { EmailMessagePayload } from '../../../Store/emailListTypes'
import { IEmailAttachmentType } from '../Attachment/EmailAttachmentTypes'

interface IInlineImageTypeResponse {
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

  const inlineImage = (attachmentData: IEmailAttachmentType) => {
    // console.log('attachmentData', attachmentData)
    // const attachmentData = threadDetailBody.parts[threadDetailBody.parts.length - 1]
    dispatch(fetchAttachment({ attachmentData, messageId })).then((response: IInlineImageTypeResponse) => {
      // console.log(response)
      if (response) {
        // console.log('here', response)
        setBodyState((currState) => [...currState, response])
      }
    })
  }

  // This function recursively loops in the emailbody to find a body to decode.
  const bodyDecoder = (inputObject: any) => {
    Object.keys(inputObject).forEach((key) => {
      // console.log(messageId, inputObject)
      if (inputObject.body.size > 0) {
        if (key === 'body') {
          // console.log(key)
          // console.log(inputObject.body)
          if (Object.prototype.hasOwnProperty.call(inputObject.body, 'attachmentId')) {
            inlineImage(inputObject)
          }
          const str = decodeBase64(`${ inputObject.body.data }`)
          // console.log(str)
          if (str) setBodyState((prevState) => [...prevState, str])
        }
      }
      if (inputObject.body.size === 0) {
        if (key === 'parts') {
          if (inputObject.parts[0].body.size > 0 && inputObject.parts[1].body.size > 0) {
            console.log('here1', inputObject)
            // Prioritise part 1 due to HTML content
            bodyDecoder(inputObject.parts[1])
          }
          if (inputObject.parts[0].body.size === 0 && inputObject.parts[1].body.size > 0) {
            console.log('here2', inputObject)
            bodyDecoder(inputObject.parts[1])
            // If the body size is 0, verify if it is an attachment
            if (Object.prototype.hasOwnProperty.call(inputObject.parts[0], 'parts')) {
              bodyDecoder(inputObject.parts[0])
            }
          }
          if (inputObject.parts[0].body.size > 0 && inputObject.parts[1].body.size === 0) {
            console.log('here3', inputObject)
            bodyDecoder(inputObject.parts[0])
            // If the body size is 0, verify if it is an attachment
            if (Object.prototype.hasOwnProperty.call(inputObject.parts[1], 'parts')) {
              bodyDecoder(inputObject.parts[1])
            }
          }
          if (inputObject.parts[0].body.size === 0 && inputObject.parts[1].body.size === 0) {
            console.log('here4', inputObject)
            // Check if the part is an attachment
            inputObject.parts.forEach((part: any) => {
              if (Object.prototype.hasOwnProperty.call(part.body, 'attachmentId')) {
                bodyDecoder(part)
              }
            })
          }
        }
        if (key === 'attachmentId') {
          console.log('attachmentFound1')
          // if (inputObject.parts[0].body.size > 0) {
          // const str = decodeBase64(
          //   `${ inputObject.parts[0].body.data }`
          // )
          // if (str) setBodyState((prevState) => [...prevState, str])
          // }
          // if (inputObject.parts[0].body.size === 0) {
          //   bodyDecoder(inputObject.parts[0])
          // }

          // If there is no body on this level, loop through it again
          // if (inputObject.parts[inputObject.parts.length - 1].body.size === 0) {
          //   console.log('here')
          //   bodyDecoder(inputObject.parts[inputObject.parts.length - 1])
          // }

          // If there is a body on this level, decode it
          // if (inputObject.parts[inputObject.parts.length - 1].body.size > 0) {
          //   console.log('here2')
          //   if (inputObject.parts[inputObject.parts.length - 1].filename.length === 0) {
          //     const str = decodeBase64(
          //       `${ inputObject.parts[inputObject.parts.length - 1].body.data }`
          //     )
          //     // console.log(str)
          //     if (str) setBodyState((prevState) => [...prevState, str])
          //     bodyDecoder(inputObject.parts[inputObject.parts.length - 1])
          //   }
          //   if (inputObject.parts[inputObject.parts.length - 1].filename.length > 0) {
          //     inlineImage()
          //     bodyDecoder(inputObject.parts[inputObject.parts.length - 1])
          //   }
          // }
        }
      }
    })
  }

  // useEffect(() => { console.log(messageId, bodyState) }, [bodyState])

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
    <div>
      {/* {console.log(bodyState)} */}
      {!isEmpty(bodyState) && bodyState[0] &&
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
    </div>
  )
}

export default EmailDetailBody
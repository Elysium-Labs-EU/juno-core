import { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import DOMPurify from 'dompurify'
import { fetchAttachment } from '../../../Store/emailDetailSlice'
import { decodeBase64 } from '../../../utils/decodeBase64'
import { useAppDispatch } from '../../../Store/hooks'
import { IEmailMessagePayload } from '../../../Store/emailListTypes'
import { IEmailAttachmentType } from '../Attachment/EmailAttachmentTypes'

interface IInlineImageTypeResponse {
  mimeType: string
  decodeB64: string
  filename: string
}

interface IEmailDetailBody {
  threadDetailBody: IEmailMessagePayload
  messageId: string
}

const EmailDetailBody = ({ threadDetailBody, messageId }: IEmailDetailBody) => {
  const [bodyState, setBodyState] = useState<any[]>([])
  const dispatch = useAppDispatch()

  const inlineImage = (attachmentData: IEmailAttachmentType) => {
    dispatch(fetchAttachment({ attachmentData, messageId })).then(
      (response: IInlineImageTypeResponse) => {
        if (response) {
          setBodyState((currState) => [...currState, response])
        }
      }
    )
  }

  useEffect(() => {
    console.log(bodyState)
  }, [bodyState])

  // This function recursively loops in the emailbody to find a body to decode.
  const bodyDecoder = (inputObject: any) => {
    console.log(inputObject)
    const objectKeys = Object.keys(inputObject)
    for (let i: number = 0; i < objectKeys.length; i += 1) {
      if (objectKeys[i] === 'body' || objectKeys[i] === 'parts') {
        if (inputObject.body.size > 0) {
          if (objectKeys[i] === 'body') {
            if (
              Object.prototype.hasOwnProperty.call(
                inputObject.body,
                'attachmentId'
              )
            ) {
              inlineImage(inputObject)
            }
            const str = decodeBase64(`${inputObject.body.data}`)
            if (str) setBodyState((prevState) => [...prevState, str])
          }
        }
        if (
          inputObject.body.size === 0 ||
          !Object.prototype.hasOwnProperty.call(inputObject, 'body')
        ) {
          if (objectKeys[i] === 'parts') {
            if (
              Object.prototype.hasOwnProperty.call(
                inputObject.parts[0],
                'parts'
              )
            ) {
              bodyDecoder(inputObject.parts[0])
              if (inputObject.parts.length > 1) {
                if (
                  Object.prototype.hasOwnProperty.call(
                    inputObject.parts[1],
                    'body'
                  ) &&
                  Object.prototype.hasOwnProperty.call(
                    inputObject.parts[1].body,
                    'attachmentId'
                  )
                ) {
                  bodyDecoder(inputObject.parts[1])
                }
              }
              return
            }
            if (inputObject.parts.length > 1) {
              if (
                Object.prototype.hasOwnProperty.call(
                  inputObject.parts[1],
                  'parts'
                )
              ) {
                bodyDecoder(inputObject.parts[1])
                return
              }
            }
            if (inputObject.parts.length > 1) {
              if (
                Object.prototype.hasOwnProperty.call(
                  inputObject.parts[1],
                  'body'
                ) &&
                Object.prototype.hasOwnProperty.call(
                  inputObject.parts[1].body,
                  'attachmentId'
                )
              ) {
                bodyDecoder(inputObject.parts[0])
                bodyDecoder(inputObject.parts[1])
                return
              }
            }
            if (inputObject.parts.length > 1) {
              if (
                Object.prototype.hasOwnProperty.call(
                  inputObject.parts[1],
                  'body'
                )
              ) {
                bodyDecoder(inputObject.parts[1])
              }
            }
          }
        }
      }
    }
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
    <div>
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

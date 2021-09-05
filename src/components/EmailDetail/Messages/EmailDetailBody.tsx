import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import DOMPurify from 'dompurify'
import { fetchAttachment } from '../../../Store/emailDetailSlice'
import { decodeBase64 } from '../../../utils/decodeBase64'

const EmailDetailBody = ({ threadDetailBody, messageId }) => {
  const [bodyState, setBodyState] = useState([])
  const dispatch = useDispatch()

  const multipartMixed = () => {
    const str = threadDetailBody.parts[0].parts
      ? decodeBase64(`${threadDetailBody.parts[0].parts[1].body.data}`)
      : decodeBase64(`${threadDetailBody.parts[0].body.data}`)
    setBodyState((currState) => [...currState, str])
  }

  const inlineImage = () => {
    const attachmentData =
      threadDetailBody.parts[threadDetailBody.parts.length - 1]
    dispatch(fetchAttachment({ attachmentData, messageId })).then(
      (response) => {
        setBodyState((currState) => [...currState, response])
      }
    )
  }

  const additionalBody = () => {
    const str = decodeBase64(`${threadDetailBody.parts[0].parts[1].body.data}`)
    setBodyState((currState) => [...currState, str])
  }

  const htmlBody = () => {
    if (
      Object.prototype.hasOwnProperty.call(threadDetailBody.parts[1], 'parts')
    ) {
      const str = decodeBase64(
        `${threadDetailBody.parts[1].parts[0].body.data}`
      )
      setBodyState((currState) => [...currState, str])
    } else {
      const str = decodeBase64(`${threadDetailBody.parts[1].body.data}`)
      setBodyState((currState) => [...currState, str])
    }
  }

  const simpleText = () => {
    const str = decodeBase64(`${threadDetailBody.body.data}`)
    setBodyState((currState) => [...currState, str])
  }

  const DetailBody = () => {
    if (threadDetailBody.mimeType === 'text/html') {
      simpleText()
    }
    if (threadDetailBody.mimeType === 'multipart/alternative') {
      htmlBody()
    }
    if (threadDetailBody.mimeType === 'multipart/mixed') {
      multipartMixed()
    }
    if (threadDetailBody.mimeType === 'multipart/related') {
      inlineImage()
      additionalBody()
    }
    // const str = base64url.decode(`${threadDetailBody.parts[0].body.data}`)
    // setBodyState(str)
  }

  useEffect(() => {
    if (messageId.length > 0) {
      DetailBody()
    }
  }, [messageId])

  return (
    <>
      {!isEmpty(bodyState) &&
        bodyState.map((item, itemIdx) =>
          Object.prototype.hasOwnProperty.call(item, 'mimeType') &&
          Object.prototype.hasOwnProperty.call(item, 'decodedB64') ? (
            <img
              key={`${item.filename + itemIdx}`}
              src={`data:${item.mimeType};base64,${item.decodedB64}`}
              alt={bodyState?.filename ?? 'embedded image'}
              style={{ maxWidth: '100%', borderRadius: '5px' }}
            />
          ) : (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={itemIdx}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(bodyState, {
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

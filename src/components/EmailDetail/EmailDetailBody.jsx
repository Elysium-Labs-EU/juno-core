import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import base64url from 'base64url'
import isEmpty from 'lodash/isEmpty'
import DOMPurify from 'dompurify'
import { fetchAttachment } from '../../Store/emailDetailSlice'

const EmailDetailBody = ({ threadDetailBody, messageId }) => {
  const [bodyState, setBodyState] = useState()
  const dispatch = useDispatch()

  // Check if feed contains singular body or not, if not - use the html version.
  const DetailBody = () => {
    console.log(threadDetailBody)
    if (threadDetailBody.mimeType === 'text/html') {
      const str = base64url.decode(`${threadDetailBody.body.data}`)
      setBodyState(str)
    }
    if (threadDetailBody.mimeType === 'multipart/alternative') {
      const str = base64url.decode(`${threadDetailBody.parts[1].body.data}`)
      setBodyState(str)
    }
    if (threadDetailBody.mimeType === 'multipart/mixed') {
      const str = threadDetailBody.parts[0].parts
        ? base64url.decode(`${threadDetailBody.parts[0].parts[1].body.data}`)
        : base64url.decode(`${threadDetailBody.parts[0].body.data}`)
      setBodyState(str)
    }
    if (threadDetailBody.mimeType === 'multipart/related') {
      const attachmentData = threadDetailBody.parts[1]
      console.log(threadDetailBody)
      dispatch(fetchAttachment({ attachmentData, messageId })).then(
        (response) => {
          setBodyState(response)
        }
      )
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
      Object.prototype.hasOwnProperty.call(bodyState, 'mimeType') &&
      Object.prototype.hasOwnProperty.call(bodyState, 'decodedB64') ? (
        <img
          src={`data:${bodyState.mimeType};base64,${bodyState.decodedB64}`}
          alt="hey"
          style={{ maxWidth: '100%', borderRadius: '5px' }}
        />
      ) : (
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(bodyState, {
              USE_PROFILES: { html: true },
            }),
          }}
        />
      )}
    </>
  )
}

export default EmailDetailBody

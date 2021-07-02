import base64url from 'base64url'
import React from 'react'
import messageApi from '../../data/messageApi'

const api = messageApi()

const EmailDetailBody = ({ threadDetailBody, messageId }) => {
  const fetchAttachment = async (attachmentId) => {
    const fetchedAttachment = await api.getAttachment(messageId, attachmentId)
    // console.log(fetchedAttachment.messageAttachment.data)
    return base64url.decode(fetchedAttachment.messageAttachment.data)
  }

  // console.log(threadDetailBody)

  // console.log(threadDetailBody)
  // console.log(threadDetailBody.parts[1].body.attachmentId)
  // Check if feed contains singular body or not, if not - use the html version.
  const DetailBody = () => {
    if (threadDetailBody.mimeType === 'text/html') {
      const str = base64url.decode(`${threadDetailBody.body.data}`)
      return <div dangerouslySetInnerHTML={{ __html: str }} />
    }
    if (threadDetailBody.mimeType === 'multipart/alternative') {
      const str = base64url.decode(`${threadDetailBody.parts[1].body.data}`)
      return <div dangerouslySetInnerHTML={{ __html: str }} />
    }
    if (threadDetailBody.mimeType === 'multipart/mixed') {
      const str = threadDetailBody.parts[0].parts
        ? base64url.decode(`${threadDetailBody.parts[0].parts[1].body.data}`)
        : base64url.decode(`${threadDetailBody.parts[0].body.data}`)
      return <div dangerouslySetInnerHTML={{ __html: str }} />
    }
    if (threadDetailBody.mimeType === 'multipart/related') {
      const body = fetchAttachment(
        messageId,
        threadDetailBody.parts[1].body.attachmentId
      )
      return <div dangerouslySetInnerHTML={{ __html: body.value }} />
    }
    const str = base64url.decode(`${threadDetailBody.parts[0].body.data}`)
    return <div dangerouslySetInnerHTML={{ __html: str }} />
  }

  return DetailBody(messageId)
}

export default EmailDetailBody

// mimeType: "multipart/alternative" <= contains no partId , has two parts
// mimeType: "text/html" <= contains no partId , has simple body

// multipart/alternative // 1763d1d2e74d3b31

// "mimeType": "multipart/mixed" 17665805823a3566

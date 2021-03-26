import base64url from 'base64url'
import { createApiClient } from '../data/api'
import React from 'react'
import { decode64toImg } from '../utils'

const api = createApiClient()

const EmailDetailBody = ({ threadDetailBody, messageId }) => {
  const [image, setImage] = React.useState({})

  const fetchInlineImage = async (messageId, attachmentId) => {
    const fetchedAttachment = await api.getAttachment(messageId, attachmentId)
    setImage(fetchedAttachment.messageAttachment.data)
    // let img = decode64toImg(fetchedAttachment.messageAttachment.data)
    // // console.log(fetchedAttachment)
    // let data = fetchedAttachment.messageAttachment.data
    // return data
  }

  // console.log(threadDetailBody)
  // console.log(threadDetailBody.parts[1].body.attachmentId)
  //Check if feed contains singular body or not, if not - use the html version.
  const DetailBody = (messageId) => {
    if (threadDetailBody.mimeType === 'text/html') {
      let str = base64url.decode(`${threadDetailBody.body.data}`)
      // console.log('1')
      return <div dangerouslySetInnerHTML={{__html:str}} />
    } else if (threadDetailBody.mimeType === 'multipart/alternative') {
      let str = base64url.decode(`${threadDetailBody.parts[1].body.data}`)
      // console.log('2')
      return <div dangerouslySetInnerHTML={{__html:str}} />
    } else if (threadDetailBody.mimeType === 'multipart/mixed') {
      let str = base64url.decode(
        `${threadDetailBody.parts[0].parts[1].body.data}`
      )
      // console.log('3')
      return <div dangerouslySetInnerHTML={{__html:str}} />
    } else if (threadDetailBody.mimeType === 'multipart/related') {      
      fetchInlineImage(messageId, threadDetailBody.parts[1].body.attachmentId)
      console.log('4')
      // return <div>Test <img src={`data:image/png;base64,${image}`}/></div>
      return <div><span>Inline image</span></div>
    } else {
      let str = base64url.decode(`${threadDetailBody.parts[0].body.data}`)
      // console.log('5')
      return <div dangerouslySetInnerHTML={{__html:str}} />
    }
    }

  return (
      DetailBody(messageId)
      )
      }

      export default EmailDetailBody

//mimeType: "multipart/alternative" <= contains no partId , has two parts
//mimeType: "text/html" <= contains no partId , has simple body

// multipart/alternative // 1763d1d2e74d3b31

//"mimeType": "multipart/mixed" 17665805823a3566

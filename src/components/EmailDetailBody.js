import base64url from 'base64url'

const EmailDetailBody = ({ threadDetailBody }) => {
  //Check if feed contains singular body or not, if not - use the html version.
  function GrabBody() {
    if (threadDetailBody.mimeType === 'text/html') {
      console.log('text/html')
      let str = base64url.decode(`${threadDetailBody.body.data}`)
      return { __html: str }
    } else if (threadDetailBody.mimeType === 'multipart/alternative') {
      console.log('multipart/alternative')
      let str = base64url.decode(`${threadDetailBody.parts[1].body.data}`)
      // let str = base64url.decode(`${threadDetailBody.parts[1].parts[0].body.data}`)
      return { __html: str }
    } else if (threadDetailBody.mimeType === 'multipart/mixed') {
      console.log('multipart/mixed')
      var str = base64url.decode(
        `${threadDetailBody.parts[0].parts[1].body.data}`
      )
      return { __html: str }
    } else {
      console.log('regular body')
      let str = base64url.decode(`${threadDetailBody.parts[0].body.data}`)
      return { __html: str }
    }
  }

  // console.log(threadDetailBody)

  return <div dangerouslySetInnerHTML={GrabBody()} />
}

export default EmailDetailBody

//mimeType: "multipart/alternative" <= contains no partId , has two parts
//mimeType: "text/html" <= contains no partId , has simple body

// multipart/alternative // 1763d1d2e74d3b31

//"mimeType": "multipart/mixed" 17665805823a3566

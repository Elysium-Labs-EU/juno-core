import { FiPaperclip } from 'react-icons/fi'

const EmailAttachment = ({ hasAttachment }) => {
  console.log('hasAttachment', hasAttachment)
  // const file = hasAttachment.parts[1].filename
  //Check if the message contains a parts.object that has an attachmentId. Don't return if no id is found.
  function CheckAttachment() {
    if (
      hasAttachment.filter((thread) => thread.payload.hasOwnProperty('parts'))
        .length > 0
    ) {
      console.log('Is multiple parts')
      if (
        hasAttachment.filter((thread) => thread.payload.parts.filename).length >
        0
      ) {
        return <FiPaperclip />
      } else {
        return null
      }
    } else {
      return null
    }
  }

  // function hasAttachmentId(element, index, array) {
  //   return element = "attachmentId"
  // };

  // let hasAttachment = hasAttachment.parts.filter(function (attachment) {
  //   return attachment.body
  // })

  // console.log(hasAttachment.parts.includes())

  let parts = hasAttachment
  // console.log("filterpart", parts.filter(part => part.payload.hasOwnProperty('parts')))
  // console.log("part", parts)
  // console.log("hasfilename", ((parts.payload.part.filter(part => part.filename).length) > 0))

  // console.log("hasfilename", (hasAttachment.filter(thread => thread.payload.parts.filename).length))

  //Good call
  // console.log("check", hasAttachment[0].payload.parts[1].filename)

  // console.log("checkmap", hasAttachment.map(
  //   thread => thread.payload.parts.map(
  //     part => part.filename.some(
  //       filename => (filename.value != null)))))

  // if (thread.id !== email.id){
  //   setEmailList(prevState =>
  // [...prevState, response.result].filter((email, index, self) =>
  //   index === self.findIndex((e) => (
  //     e.id === email.id
  // ))))}

  function checkmap3() {
    hasAttachment.map((thread) =>
      thread.payload.parts.map((part) => part.filename)
    )
  }

  console.log(checkmap3)
  // console.log("checkmap2", hasAttachment.map(thread => thread.payload.parts.map(part => part.filename[0].filter(object => object.length > 0))))
  // console.log("checkmap", hasAttachment.map(thread => thread.payload.map(part => part.filename))

  // console.log("checkFE", hasAttachment.forEach(thread => thread.payload.parts[1].filename))

  // function hasAttachmentId() {
  //   parts.forEach((part) => console.log(part.body.hasOwnProperty('attachmentId')))
  // }

  function hasAttachmentId2() {
    console.log(
      parts.filter((part) => part.body.hasOwnProperty('attachmentId'))
    )
  }

  function hasAttachmentId3() {
    parts.filter((part) => part.filename)
  }

  function hasParts() {
    parts.filter((part) => part.payload.hasOwnProperty('parts'))
  }

  // function CheckAttachment1() {
  //   if (((parts.filter(part => part.payload.hasOwnProperty('parts'))).length) > 0) {
  //     console.log("done")
  //     return <FiPaperclip />
  //   } else {
  //     return <p>N</p>
  //     }
  // }

  // console.log(parts.filter(part => part.filename).length)

  return (
    <CheckAttachment />
    // <div>
    //   hi
    // </div>
  )
}

export default EmailAttachment

// display: ${props => props.hasAttachement === "image/png" ? "flex" : "none"};

// e.messages[0].payload.parts[1].body.attachmentId

// 1768c9b7816bed78

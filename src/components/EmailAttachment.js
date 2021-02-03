import { FiPaperclip } from 'react-icons/fi'
import base64url from 'base64url'

const EmailAttachment = ({ hasAttachment }) => {
  //Check if the message contains a parts.object that has an attachmentId. Don't return if no id is found.
  // checkAttachment(mimeType) {
  //     if mimeType === "image/png" {

  //     }
  // }

  function fetchAttachment() {
    return window.gapi.client.gmail.users.messages.attachments
      .get({
        userId: 'me',
        messageId: '1768c9b7816bed78',
        id:
          'ANGjdJ9-IZ7o27B_heeCOJO4kTV0SOkhSkOL0JCTriZDOvUd7h5cGYM9gijZ2POKS5D0TRiCcwM7kNQMzRztx-l1GUzyyWdMsaYjoq4oCLP8iZoHU-OyTo_ExZ2EInNQBwo2vO-YfgAOkwzp0BdYF2Rf6WdRluzQ-IIl4BGxEEQRdv5zuJWM2lYhK9okcI6o7r4RFrfCjfavycNyQGAksbQazN4iBjfYgVM8-gmrFQ',
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log('Response', response.result)
          var decodeFile = base64url.decode(`${response.result.data.value}`)

          console.log('Decode', { __html: decodeFile })
          // return { __html: decodeFile };
        },
        function (err) {
          console.error('Execute error', err)
        }
      )
  }

  return (
    <div>
      <FiPaperclip />
      {/* <div onLoad={fetchAttachment()} /> */}
      <button onClick={() => fetchAttachment()}>Click me</button>
    </div>
  )
}

export default EmailAttachment

// display: ${props => props.hasAttachement === "image/png" ? "flex" : "none"};

// e.messages[0].payload.parts[1].body.attachmentId

// 1768c9b7816bed78

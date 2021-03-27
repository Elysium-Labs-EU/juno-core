import React from 'react'
import { FiDownload, FiFile } from 'react-icons/fi'
import './EmailAttachmentBubble.scss'
import { createApiClient } from '../data/api'
import prettyBytes from 'pretty-bytes'
import base64url from 'base64url'

const api = createApiClient()

const EmailAttachmentBubble = ({ attachmentData, messageId }) => {
  const fetchAttachment = async (messageId, attachmentId) => {
    const fetchedAttachment = await api.getAttachment(messageId, attachmentId)
    console.log(fetchedAttachment)
  }

  return (
    <>
      {attachmentData.filename.length > 0 ? (
        <div
          key={attachmentData.partId}
          className="attachment"
          onClick={() =>
            fetchAttachment(messageId, attachmentData.body.attachmentId)
          }
        >
          <FiFile size={20} />
          <div className="attachment-inner">
            <span>{attachmentData.filename}</span>
            <div className="attachment-details">
              File - {prettyBytes(attachmentData.body.size)}
            </div>
          </div>
          <FiDownload size={20} />
        </div>
      ) : null}
    </>
  )
}

export default EmailAttachmentBubble

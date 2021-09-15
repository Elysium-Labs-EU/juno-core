import React, { useState } from 'react'
import { FiCheck, FiDownload } from 'react-icons/fi'
import './EmailAttachmentBubble.scss'
import prettyBytes from 'pretty-bytes'
import * as S from './EmailAttachmentBubbleStyles'
import { CustomIconLink } from '../../Elements/Buttons'
import {
  downloadAttachment,
  // fetchAttachment,
} from '../../../Store/emailDetailSlice'
import EmailAttachmentType from './EmailAttachmentType'
import { useAppDispatch } from '../../../Store/hooks'

const FILE = 'File - '

const EmailAttachmentBubble = ({ attachmentData, messageId }) => {
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <>
      {attachmentData.filename.length > 0 && (
        <S.Attachment div key={attachmentData.partId}>
          <EmailAttachmentType mimeType={attachmentData?.mimeType} />
          <S.AttachmentInner
            className="attachment-inner"
          // onClick={() =>
          //   dispatch(fetchAttachment({ messageId, attachmentData }))
          // }
          // aria-hidden="true"
          >
            <span>{attachmentData.filename}</span>
            <p className="text_small text_muted" style={{ margin: 0 }}>
              {FILE}
              {prettyBytes(attachmentData.body.size)}
            </p>
          </S.AttachmentInner>
          <CustomIconLink
            onClick={() =>
              dispatch(downloadAttachment({ messageId, attachmentData })).then(
                setDownloaded(true)
              )
            }
            icon={
              !downloaded ? <FiDownload size={20} /> : <FiCheck size={20} />
            }
            className="nav-item-button"
          />
        </S.Attachment>
      )}
    </>
  )
}

export default EmailAttachmentBubble

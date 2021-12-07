import React, { useState } from 'react'
import { FiCheck, FiDownload } from 'react-icons/fi'
import './EmailAttachmentBubble.scss'
import prettyBytes from 'pretty-bytes'
import * as S from './EmailAttachmentBubbleStyles'
import { CustomIconLink } from '../../Elements/Buttons'
import { downloadAttachment } from '../../../Store/emailDetailSlice'
import EmailAttachmentIcon from './EmailAttachmentIcon'
import { useAppDispatch } from '../../../Store/hooks'
import { EmailAttachmentType } from './EmailAttachmentTypes'

const FILE = 'File - '

const RenderAttachment = ({ attachmentData, messageId }: { attachmentData: EmailAttachmentType, messageId: string }) => {
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <S.Attachment key={attachmentData.partId}>
      <EmailAttachmentIcon mimeType={attachmentData?.mimeType} />
      <S.AttachmentInner
        className="attachment-inner"
      >
        <span>{attachmentData.filename}</span>
        <p className="text_small text_muted" style={{ margin: 0 }}>
          {FILE}
          {prettyBytes(attachmentData.body.size)}
        </p>
      </S.AttachmentInner>
      <CustomIconLink
        onClick={() =>
          dispatch(downloadAttachment({ messageId, attachmentData })).then(setDownloaded(true))
        }
        icon={!downloaded ? <FiDownload size={20} /> : <FiCheck size={20} />}
        className="nav-item-button"
      />
    </S.Attachment>
  )
}

const EmailAttachmentBubble = ({ attachmentData, messageId }: { attachmentData: EmailAttachmentType, messageId: string }) => (attachmentData.filename.length > 0 && messageId.length > 0 ? <RenderAttachment attachmentData={attachmentData} messageId={messageId} /> : null)


export default EmailAttachmentBubble
import React, { useState } from 'react'
import { FiCheck, FiDownload } from 'react-icons/fi'
import prettyBytes from 'pretty-bytes'
import * as S from './EmailAttachmentBubbleStyles'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import { downloadAttachment } from '../../../Store/emailDetailSlice'
import EmailAttachmentIcon from './EmailAttachmentIcon'
import { useAppDispatch } from '../../../Store/hooks'
import { IEmailAttachmentType } from './EmailAttachmentTypes'

const FILE = 'File - '

const RenderAttachment = ({ attachmentData, messageId }: { attachmentData: IEmailAttachmentType, messageId: string }) => {
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <S.Attachment key={attachmentData.partId}>
      <EmailAttachmentIcon mimeType={attachmentData?.mimeType} />
      <S.AttachmentInner>
        <span>{attachmentData.filename}</span>
        <p className="text_small text_muted" style={{ margin: 0 }}>
          {FILE}
          {prettyBytes(attachmentData.body.size)}
        </p>
      </S.AttachmentInner>
      <CustomIconButton
        onClick={() =>
          dispatch(downloadAttachment({ messageId, attachmentData })).then(setDownloaded(true))
        }
        icon={!downloaded ? <FiDownload size={20} /> : <FiCheck size={20} />}
      />
    </S.Attachment>
  )
}

const EmailAttachmentBubble = ({ attachmentData, messageId }: { attachmentData: IEmailAttachmentType, messageId: string }) => (attachmentData.filename.length > 0 && messageId.length > 0 ? <RenderAttachment attachmentData={attachmentData} messageId={messageId} /> : null)


export default EmailAttachmentBubble
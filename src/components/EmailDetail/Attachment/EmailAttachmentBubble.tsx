import { useState } from 'react'
import { FiCheck, FiDownload } from 'react-icons/fi'
import prettyBytes from 'pretty-bytes'
import * as S from './EmailAttachmentBubbleStyles'
import * as GS from '../../../styles/globalStyles'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import { downloadAttachment } from '../../../Store/emailDetailSlice'
import EmailAttachmentIcon from './EmailAttachmentIcon'
import { useAppDispatch } from '../../../Store/hooks'
import { IEmailAttachmentType } from './EmailAttachmentTypes'

const FILE = 'File - '

const RenderAttachment = ({
  attachmentData,
  messageId,
  index,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
  index: number | undefined
}) => {
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(downloadAttachment({ messageId, attachmentData }))
    setDownloaded(true)
  }

  return (
    <S.Attachment index={index}>
      <EmailAttachmentIcon mimeType={attachmentData?.mimeType} />
      <S.AttachmentInner>
        <span>{attachmentData.filename}</span>
        <GS.TextMutedSmall style={{ margin: 0 }}>
          {FILE}
          {prettyBytes(attachmentData.body.size)}
        </GS.TextMutedSmall>
      </S.AttachmentInner>
      <CustomIconButton
        onClick={handleClick}
        icon={!downloaded ? <FiDownload size={20} /> : <FiCheck size={20} />}
      />
    </S.Attachment>
  )
}

const EmailAttachmentBubble = ({
  attachmentData,
  messageId,
  index,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
  index?: number
}) =>
  attachmentData.filename.length > 0 && messageId.length > 0 ? (
    <RenderAttachment
      attachmentData={attachmentData}
      messageId={messageId}
      index={index}
    />
  ) : null

export default EmailAttachmentBubble

EmailAttachmentBubble.defaultProps = {
  index: undefined,
}

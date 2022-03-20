import { useState } from 'react'
import { FiCheck, FiDownload } from 'react-icons/fi'
import prettyBytes from 'pretty-bytes'
import * as S from './EmailAttachmentBubbleStyles'
import * as GS from '../../../styles/globalStyles'
import * as global from '../../../constants/globalConstants'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import { downloadAttachment } from '../../../Store/emailDetailSlice'
import EmailAttachmentIcon from './EmailAttachmentIcon'
import { useAppDispatch } from '../../../Store/hooks'
import { IEmailAttachmentType } from './EmailAttachmentTypes'

const ICON_SIZE = 20

const RenderAttachment = ({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
}) => {
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(downloadAttachment({ messageId, attachmentData }))
    setDownloaded(true)
  }

  return (
    <S.Attachment key={attachmentData.partId}>
      <EmailAttachmentIcon mimeType={attachmentData?.mimeType} />
      <S.AttachmentInner>
        <span>{attachmentData.filename}</span>
        <GS.TextMutedSmall style={{ margin: 0 }}>
          {global.FILE}
          {prettyBytes(attachmentData.body.size)}
        </GS.TextMutedSmall>
      </S.AttachmentInner>
      <CustomIconButton
        onClick={handleClick}
        icon={
          !downloaded ? (
            <FiDownload size={ICON_SIZE} />
          ) : (
            <FiCheck size={ICON_SIZE} />
          )
        }
      />
    </S.Attachment>
  )
}

const EmailAttachmentBubble = ({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
}) =>
  attachmentData.filename.length > 0 && messageId.length > 0 ? (
    <RenderAttachment attachmentData={attachmentData} messageId={messageId} />
  ) : null

export default EmailAttachmentBubble

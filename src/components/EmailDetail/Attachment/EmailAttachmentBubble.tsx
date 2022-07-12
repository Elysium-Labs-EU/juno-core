import { useState } from 'react'
import { FiCheck, FiDownload } from 'react-icons/fi'
import prettyBytes from 'pretty-bytes'
import * as S from './EmailAttachmentBubbleStyles'
import * as GS from '../../../styles/globalStyles'
import * as global from '../../../constants/globalConstants'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import EmailAttachmentIcon from './EmailAttachmentIcon'
import { IEmailAttachmentType } from './EmailAttachmentTypes'
import downloadAttachment from '../../../utils/downloadAttachment'
import { useAppDispatch } from '../../../store/hooks'
import { setServiceUnavailable } from '../../../store/utilsSlice'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'

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
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = async () => {
    setLoadState(global.LOAD_STATE_MAP.loading)
    const response = await downloadAttachment({ messageId, attachmentData })
    if (response.success) {
      setDownloaded(true)
      setLoadState(global.LOAD_STATE_MAP.loaded)
      return
    }
    setLoadState(global.LOAD_STATE_MAP.error)
    dispatch(setServiceUnavailable(response.message ?? global.NETWORK_ERROR))
  }

  return (
    <S.Attachment index={index ?? 0}>
      <EmailAttachmentIcon mimeType={attachmentData?.mimeType} />
      <S.AttachmentInner>
        <span>{attachmentData.filename}</span>
        <GS.TextMutedSmall style={{ margin: 0 }}>
          {FILE}
          {prettyBytes(attachmentData.body.size)}
        </GS.TextMutedSmall>
      </S.AttachmentInner>
      {loadState !== global.LOAD_STATE_MAP.loading ? (
        <CustomIconButton
          onClick={handleClick}
          icon={!downloaded ? <FiDownload size={20} /> : <FiCheck size={20} />}
        />
      ) : (
        <StyledCircularProgress size={20} />
      )}
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

import prettyBytes from 'pretty-bytes'
import { useCallback, useState } from 'react'

import * as global from '../../../constants/globalConstants'
import { QiCheckmark, QiDownload } from '../../../images/svgIcons/quillIcons'
import { useAppDispatch } from '../../../store/hooks'
import { setServiceUnavailable } from '../../../store/utilsSlice'
import * as GS from '../../../styles/globalStyles'
import { downloadAttachmentSingle } from '../../../utils/downloadAttachment'
import CustomIconButton from '../../Elements/Buttons/CustomIconButton'
import StyledCircularProgress from '../../Elements/StyledCircularProgress'
import * as S from './EmailAttachmentBubbleStyles'
import EmailAttachmentIcon from './EmailAttachmentIcon'
import { IEmailAttachmentType } from './EmailAttachmentTypes'

const FILE = 'File - '
const ICON_SIZE = 20

const RenderAttachment = ({
  attachmentData,
  messageId,
}: {
  attachmentData: IEmailAttachmentType
  messageId: string
}) => {
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = useCallback(async () => {
    setLoadState(global.LOAD_STATE_MAP.loading)
    const response = await downloadAttachmentSingle({
      messageId,
      attachmentData,
    })
    if (response?.success) {
      setDownloaded(true)
      setLoadState(global.LOAD_STATE_MAP.loaded)
      return
    }
    setLoadState(global.LOAD_STATE_MAP.error)
    dispatch(setServiceUnavailable(response.message ?? global.NETWORK_ERROR))
  }, [attachmentData, messageId])

  return (
    <S.Attachment>
      <EmailAttachmentIcon mimeType={attachmentData?.mimeType} />
      <S.AttachmentInner>
        <span className="file_name">{attachmentData.filename}</span>
        <GS.TextMutedSpanSmall>
          {FILE}
          {prettyBytes(attachmentData.body.size)}
        </GS.TextMutedSpanSmall>
      </S.AttachmentInner>
      {loadState !== global.LOAD_STATE_MAP.loading ? (
        <CustomIconButton
          onClick={handleClick}
          icon={
            !downloaded ? (
              <QiDownload size={ICON_SIZE} />
            ) : (
              <QiCheckmark size={ICON_SIZE} />
            )
          }
          title={!downloaded ? 'Download attachment' : 'Attachment downloaded'}
        />
      ) : (
        <StyledCircularProgress size={ICON_SIZE} />
      )}
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

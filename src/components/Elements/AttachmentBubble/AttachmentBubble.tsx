import prettyBytes from 'pretty-bytes'
import { useCallback, useState } from 'react'

import * as global from '../../../constants/globalConstants'
import {
  QiCheckmark,
  QiDownload,
  QiEscape,
} from '../../../images/svgIcons/quillIcons'
import { useAppDispatch } from '../../../store/hooks'
import { setSystemStatusUpdate } from '../../../store/utilsSlice'
import * as GS from '../../../styles/globalStyles'
import { downloadAttachmentSingle } from '../../../utils/downloadAttachment'
import { IEmailAttachmentType } from '../../EmailDetail/Attachment/EmailAttachmentTypes'
import CustomIconButton from '../Buttons/CustomIconButton'
import StyledCircularProgress from '../StyledCircularProgress'
import * as S from './AttachmentBubbleStyles'
import EmailAttachmentIcon from './AttachmentIcon'

const ICON_SIZE = 20

const DownloadButton = ({
  attachmentData,
  messageId = undefined,
}: {
  attachmentData: IEmailAttachmentType
  messageId?: string
}) => {
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = useCallback(async () => {
    setLoadState(global.LOAD_STATE_MAP.loading)
    if (messageId) {
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
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: response.message ?? global.NETWORK_ERROR,
        })
      )
    }
  }, [attachmentData, messageId])

  return loadState !== global.LOAD_STATE_MAP.loading ? (
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
  )
}

const DeleteButton = ({
  handleDelete,
  index,
}: {
  handleDelete: (attachmentIndex: number) => void
  index: number
}) => (
  <CustomIconButton
    title="Remove"
    onClick={() => handleDelete(index)}
    icon={<QiEscape size={ICON_SIZE} />}
  />
)

const AttachmentBubble = ({
  attachmentData,
  messageId = undefined,
  hasDownload = true,
  handleDelete = undefined,
  index = undefined,
}: {
  attachmentData: IEmailAttachmentType | File
  messageId?: string
  hasDownload?: boolean
  handleDelete?: (attachmentIndex: number) => void
  index?: number | undefined
}) => {
  const mimeType =
    'mimeType' in attachmentData
      ? attachmentData.mimeType
      : attachmentData?.type ?? 'no file type found'
  const fileName =
    'filename' in attachmentData
      ? attachmentData.filename
      : attachmentData?.name ?? 'no file name found'
  const fileSize =
    'body' in attachmentData
      ? attachmentData.body?.size
      : attachmentData?.size ?? 0

  return (
    <S.Attachment>
      <EmailAttachmentIcon mimeType={mimeType} />
      <S.AttachmentInner>
        <span className="file_name">{fileName}</span>
        <GS.Span muted small>
          {global.FILE}
          {prettyBytes(fileSize)}
        </GS.Span>
      </S.AttachmentInner>
      {hasDownload && 'body' in attachmentData && (
        <DownloadButton attachmentData={attachmentData} messageId={messageId} />
      )}
      {handleDelete && index !== undefined && (
        <DeleteButton handleDelete={handleDelete} index={index} />
      )}
    </S.Attachment>
  )
}

export default AttachmentBubble

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledCircularProgress from 'components/Elements/StyledCircularProgress'
import { IEmailAttachmentType, IFetchedAttachment } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import * as global from 'constants/globalConstants'
import { QiCheckmark, QiDownload, QiEscape, QiEye } from 'images/svgIcons/quillIcons'
import { useCallback, useState } from 'react'
import { useAppDispatch } from 'store/hooks'
import { setActiveModal, setSystemStatusUpdate } from 'store/utilsSlice'
import * as GS from 'styles/globalStyles'
import { downloadAttachmentSingle } from 'utils/downloadAttachment'
import formatBytes from 'utils/prettierBytes'
import { viewAttachment } from 'utils/viewAttachment'
import AttachmentModal from '../AttachmentModal/AttachmentModal'
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

const ViewAttachmentButton = ({
  attachmentData,
  messageId = undefined,
}: {
  attachmentData: IEmailAttachmentType
  messageId?: string
}) => {
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [fetchedAttachmentData, setFetchedAttachmentData] =
    useState<null | IFetchedAttachment>(null)
  const dispatch = useAppDispatch()

  const handleClick = async () => {
    setLoadState(global.LOAD_STATE_MAP.loading)
    if (messageId) {
      const response = await viewAttachment({
        messageId,
        attachmentData,
      })
      if (response?.success) {
        setLoadState(global.LOAD_STATE_MAP.loaded)
        setFetchedAttachmentData({
          blobUrl: response?.blobUrl,
          mimeType: response?.mimeType,
        })
        dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.attachment))

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
  }

  return loadState !== global.LOAD_STATE_MAP.loading ? (
    <>
      {fetchedAttachmentData?.blobUrl !== '' ? (
        <AttachmentModal
          fetchedAttachmentData={fetchedAttachmentData}
          attachmentData={attachmentData}
        />
      ) : null}
      <CustomIconButton
        onClick={handleClick}
        icon={<QiEye />}
        title="View attachment"
      />
    </>
  ) : (
    <StyledCircularProgress size={ICON_SIZE} />
  )
}
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
          {formatBytes(fileSize)}
        </GS.Span>
      </S.AttachmentInner>
      {hasDownload && 'body' in attachmentData && (
        <>
          <ViewAttachmentButton
            attachmentData={attachmentData}
            messageId={messageId}
          />
          <DownloadButton
            attachmentData={attachmentData}
            messageId={messageId}
          />
        </>
      )}
      {handleDelete && index !== undefined && (
        <DeleteButton handleDelete={handleDelete} index={index} />
      )}
    </S.Attachment>
  )
}

export default AttachmentBubble

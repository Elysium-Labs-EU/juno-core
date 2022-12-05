import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledCircularProgress from 'components/Elements/StyledCircularProgress'
import {
  IEmailAttachmentType,
  IFetchedAttachment,
} from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import * as global from 'constants/globalConstants'
import {
  QiCheckmark,
  QiDownload,
  QiEscape,
  QiEye,
} from 'images/svgIcons/quillIcons'
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  selectActiveModal,
  setActiveModal,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
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
    <S.DownloadDeleteButton>
      <StyledCircularProgress size={ICON_SIZE} />
    </S.DownloadDeleteButton>
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

const ViewAttachmentButton = forwardRef<HTMLButtonElement, any>(
  (
    {
      attachmentData,
      messageId = undefined,
    }: {
      attachmentData: IEmailAttachmentType
      messageId?: string
    },
    ref
  ) => {
    const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
    const [fetchedAttachmentData, setFetchedAttachmentData] =
      useState<null | IFetchedAttachment>(null)
    const dispatch = useAppDispatch()
    const activeModal = useAppSelector(selectActiveModal)

    const handleClick = async () => {
      // Do not trigger this function if the attachment is already previewed
      if (
        activeModal ===
        `${global.ACTIVE_MODAL_MAP.attachment}${attachmentData?.body?.attachmentId}`
      ) {
        return
      }
      if (messageId && fetchedAttachmentData === null) {
        setLoadState(global.LOAD_STATE_MAP.loading)
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
          dispatch(
            setActiveModal(
              `${global.ACTIVE_MODAL_MAP.attachment}${attachmentData?.body?.attachmentId}`
            )
          )
          return
        }
        setLoadState(global.LOAD_STATE_MAP.error)
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: response.message ?? global.NETWORK_ERROR,
          })
        )
      } else {
        // If the data is already fetched, just open the modal
        dispatch(
          setActiveModal(
            `${global.ACTIVE_MODAL_MAP.attachment}${attachmentData?.body?.attachmentId}`
          )
        )
      }
    }

    return loadState !== global.LOAD_STATE_MAP.loading ? (
      <>
        {fetchedAttachmentData && (
          <AttachmentModal
            fetchedAttachmentData={fetchedAttachmentData}
            attachmentData={attachmentData}
          />
        )}
        <CustomIconButton
          ref={ref}
          onClick={handleClick}
          icon={<QiEye />}
          title="View attachment"
        />
      </>
    ) : (
      <StyledCircularProgress size={ICON_SIZE} />
    )
  }
)
const AttachmentBubble = ({
  attachmentData,
  messageId = undefined,
  hasDownloadOption = true,
  handleDelete = undefined,
  index = undefined,
}: {
  attachmentData: IEmailAttachmentType | File
  messageId?: string
  hasDownloadOption?: boolean
  handleDelete?: (attachmentIndex: number) => void
  index?: number | undefined
}) => {
  const previewButtonRef = useRef<HTMLButtonElement>(null)

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

  const memoizedViewAttachmentButton = useMemo(
    () =>
      'body' in attachmentData ? (
        <S.PreviewButtonContainer>
          <ViewAttachmentButton
            attachmentData={attachmentData}
            messageId={messageId}
            ref={previewButtonRef}
          />
        </S.PreviewButtonContainer>
      ) : null,
    [attachmentData, messageId]
  )

  const memoizedDownloadButton = useMemo(
    () =>
      hasDownloadOption && 'body' in attachmentData ? (
        <S.DownloadDeleteButton>
          <DownloadButton
            attachmentData={attachmentData}
            messageId={messageId}
          />
        </S.DownloadDeleteButton>
      ) : null,
    [attachmentData, hasDownloadOption, messageId]
  )

  const memoizedDeleteButton = useMemo(
    () =>
      handleDelete && index !== undefined ? (
        <S.DownloadDeleteButton>
          <DeleteButton handleDelete={handleDelete} index={index} />
        </S.DownloadDeleteButton>
      ) : null,
    [handleDelete, index]
  )

  // TODO: Add preview for uploaded file with file type FILE
  return (
    <S.AttachmentWrapper>
      <S.Attachment
        onClick={() => previewButtonRef.current?.click()}
        aria-hidden="true"
        id={
          'body' in attachmentData
            ? attachmentData?.body?.attachmentId
            : undefined
        }
      >
        <S.AttachmentInner>
          <EmailAttachmentIcon mimeType={mimeType} />
          <S.AttachmentDetails>
            <span className="file_name">{fileName}</span>
            <GS.Span muted small>
              {global.FILE}
              {formatBytes(fileSize)}
            </GS.Span>
          </S.AttachmentDetails>
        </S.AttachmentInner>
        {memoizedViewAttachmentButton}
      </S.Attachment>
      {memoizedDownloadButton}
      {memoizedDeleteButton}
    </S.AttachmentWrapper>
  )
}

export default AttachmentBubble

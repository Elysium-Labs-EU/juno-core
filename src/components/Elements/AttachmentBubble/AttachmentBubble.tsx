/* eslint-disable no-underscore-dangle */
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import CustomIconButton from 'components/Elements/Buttons/CustomIconButton'
import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import type {
  EmailAttachmentType,
  IFetchedAttachment,
} from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import * as global from 'constants/globalConstants'
import {
  QiCheckmark,
  QiDownload,
  QiEscape,
  QiEye,
} from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { selectActiveModal, setActiveModal } from 'store/utilsSlice'
import { Span } from 'styles/globalStyles'
import { downloadAttachmentSingle } from 'utils/downloadAttachment'
import formatBytes from 'utils/prettierBytes'
import viewAttachment from 'utils/viewAttachment'

import * as S from './AttachmentBubbleStyles'
import EmailAttachmentIcon from './AttachmentIcon'
import AttachmentModal from '../AttachmentModal/AttachmentModal'
import CustomToast from '../Toast/Toast'

const ICON_SIZE = 20

const loadStateIconMap = {
  [global.LOAD_STATE_MAP.idle]: <QiDownload size={ICON_SIZE} />,
  [global.LOAD_STATE_MAP.loading]: <StyledCircularProgress size={ICON_SIZE} />,
  [global.LOAD_STATE_MAP.loaded]: <QiCheckmark size={ICON_SIZE} />,
}

const loadStateTitleMap = {
  [global.LOAD_STATE_MAP.idle]: 'Download attachment',
  [global.LOAD_STATE_MAP.loading]: 'Downloading...',
  [global.LOAD_STATE_MAP.loaded]: 'Attachment downloaded',
}

const DownloadButton = ({
  attachmentData,
  messageId = undefined,
}: {
  attachmentData: EmailAttachmentType
  messageId?: string
}) => {
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)

  const handleClick = useCallback(async () => {
    setLoadState(global.LOAD_STATE_MAP.loading)
    if (messageId) {
      const response = await downloadAttachmentSingle({
        messageId,
        attachmentData,
      })
      if (response?.success) {
        setLoadState(global.LOAD_STATE_MAP.loaded)
        return
      }
      setLoadState(global.LOAD_STATE_MAP.error)
      toast.custom((t) => (
        <CustomToast
          specificToast={t}
          title={response.message ?? global.NETWORK_ERROR}
          variant="error"
        />
      ))
    }
  }, [attachmentData, messageId])

  const buttonIcon = loadStateIconMap[loadState]
  const buttonTitle = loadStateTitleMap[loadState]
  if (buttonIcon && buttonTitle) {
    return (
      <CustomIconButton
        onClick={handleClick}
        icon={buttonIcon}
        title={buttonTitle}
      />
    )
  }
  return null
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
      attachmentData: EmailAttachmentType
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
          if (window.__TAURI_METADATA__) {
            // TODO: Write to save the file in temp folder, and open it right away.
          } else {
            setFetchedAttachmentData({
              blobUrl: response?.blobUrl,
              mimeType: response?.mimeType,
            })
            dispatch(
              setActiveModal(
                `${global.ACTIVE_MODAL_MAP.attachment}${attachmentData?.body?.attachmentId}`
              )
            )
          }
          return
        }
        setLoadState(global.LOAD_STATE_MAP.error)
        toast.custom((t) => (
          <CustomToast
            specificToast={t}
            title={response.message ?? global.NETWORK_ERROR}
            variant="error"
          />
        ))
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

interface IAttachmentBubble {
  attachmentData: EmailAttachmentType | File
  handleDelete?: (attachmentIndex: number) => void
  hasDownloadOption?: boolean
  index?: number | undefined
  messageId?: string
}

const AttachmentBubble = ({
  attachmentData,
  handleDelete = undefined,
  hasDownloadOption = true,
  index = undefined,
  messageId = undefined,
}: IAttachmentBubble) => {
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

  // TODO: Reinstate this with using the Tauri API
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
        <S.DownloadDeleteButtonContainer>
          <DownloadButton
            attachmentData={attachmentData}
            messageId={messageId}
          />
        </S.DownloadDeleteButtonContainer>
      ) : null,
    [attachmentData, hasDownloadOption, messageId]
  )

  const memoizedDeleteButton = useMemo(
    () =>
      handleDelete && index !== undefined ? (
        <S.DownloadDeleteButtonContainer>
          <DeleteButton handleDelete={handleDelete} index={index} />
        </S.DownloadDeleteButtonContainer>
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
            <Span className="file_name">{fileName}</Span>
            <Span muted small>
              {global.FILE}
              {formatBytes(fileSize)}
            </Span>
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

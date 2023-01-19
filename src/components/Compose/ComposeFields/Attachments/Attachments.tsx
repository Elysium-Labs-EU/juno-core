/* eslint-disable react/no-array-index-key */
// import { isEqual } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import AttachmentBubble from 'components/Elements/AttachmentBubble/AttachmentBubble'
import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import FileUpload from 'components/Elements/FileUpload/FileUpload'
import { IEmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import * as local from 'constants/composeEmailConstants'
import * as global from 'constants/globalConstants'
import { useAppDispatch } from 'store/hooks'
import { setSystemStatusUpdate } from 'store/utilsSlice'
import convertB64AttachmentToFile from 'utils/convertB64AttachmentToFile'
import formatBytes from 'utils/prettierBytes'

import * as S from './AttachmentsStyles'

const ATTACHMENTS = 'Attachments'
const MAX_MB_UPLOAD_DIRECT = 25000000

const customIsEqual = (
  composeValue: File[] | IEmailAttachmentType[] | undefined,
  uploadedFiles: File[]
) =>
  Object.is(
    composeValue?.map((item: File | IEmailAttachmentType) => ({
      size: 'size' in item ? item.size : item.body.size,
      name: 'name' in item ? item.name : item.filename,
    })),
    uploadedFiles.map((item: File) => ({
      size: item.size,
      name: item.name,
    }))
  )

const Attachments = ({
  messageId,
  composeValue,
  updateComposeEmail,
  loadState,
  setHasInteracted,
  hasInteracted,
}: {
  messageId: string | undefined
  composeValue: File[] | IEmailAttachmentType[] | undefined
  updateComposeEmail: (action: { id: string; value: File[] }) => void
  loadState: string
  setHasInteracted: (value: boolean) => void
  hasInteracted: boolean
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [localLoadState, setLocalLoadState] = useState(
    global.LOAD_STATE_MAP.idle
  )
  const dispatch = useAppDispatch()

  //! Watch out for a loop, where the draft update on the parent component keeps sending new attachments as preset values.
  /**
   * This function will the composeValue, if there are objects in there which are not of type File, it will download the file data and convert it to a File.
   * This function also keeps the local state in sync with the parent component state.
   */
  useEffect(() => {
    if (
      composeValue &&
      loadState === global.LOAD_STATE_MAP.loaded &&
      !customIsEqual(composeValue, uploadedFiles)
    ) {
      if (composeValue.some((value: any) => 'partId' in value) && messageId) {
        setLocalLoadState(global.LOAD_STATE_MAP.loading)
        const fetchAttachments = async () => {
          const noneFileTypeItems: IEmailAttachmentType[] = []
          composeValue.forEach((item: File | IEmailAttachmentType) => {
            if ('partId' in item) {
              noneFileTypeItems.push(item)
            }
          })
          const response = await convertB64AttachmentToFile({
            id: messageId,
            files: noneFileTypeItems,
          })
          if (response && response.length > 0) {
            const fileTypeItems: File[] = []
            composeValue.forEach((item: File | IEmailAttachmentType) => {
              if (!('partId' in item)) {
                fileTypeItems.push(item)
              }
            })
            setUploadedFiles((prevState) => [
              ...prevState,
              ...response,
              ...fileTypeItems,
            ])
            setLocalLoadState(global.LOAD_STATE_MAP.loaded)
          } else {
            dispatch(
              setSystemStatusUpdate({
                type: 'error',
                message: 'Unable to restore attachments.',
              })
            )
            setLocalLoadState(global.LOAD_STATE_MAP.loaded)
          }
        }
        fetchAttachments()
      } else {
        const typedComposeValues = composeValue as File[]
        setUploadedFiles(typedComposeValues)
      }
    }
  }, [composeValue, loadState, messageId])

  const onDropHandeler = useCallback(
    (data: File[]) => {
      if (data.some((item) => item.size > MAX_MB_UPLOAD_DIRECT)) {
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: `File size can not exceed ${formatBytes(
              MAX_MB_UPLOAD_DIRECT
            )}`,
          })
        )
        return
      }
      // if (data.every((item) => item.type.includes('image'))) {
      //     if (data.every((item) => !/bmp|x-icon|tiff/.test(item.type))) {
      setUploadedFiles((prevState) => [...prevState, ...data])
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [uploadedFiles, composeValue, hasInteracted]
  )

  const handleDeleteFile = useCallback(
    (index: number) => {
      setUploadedFiles((prevState) =>
        prevState.filter((item) => prevState.indexOf(item) !== index)
      )
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [uploadedFiles, hasInteracted]
  )

  // Sync the local state with the parent component state
  useEffect(() => {
    if (
      loadState === global.LOAD_STATE_MAP.loaded &&
      !customIsEqual(composeValue, uploadedFiles)
    ) {
      const updateEventObject = {
        id: local.FILES,
        value: uploadedFiles,
      }
      updateComposeEmail(updateEventObject)
    }
  }, [uploadedFiles, loadState, composeValue, updateComposeEmail])

  return (
    <S.Wrapper data-cy="attachments-field">
      {uploadedFiles.length > 0 && (
        <S.AttachmentHeaderContainer>
          <S.StyledBadge badgeContent={uploadedFiles.length} color="primary">
            <S.AttachmentHeader>{ATTACHMENTS}</S.AttachmentHeader>
          </S.StyledBadge>
        </S.AttachmentHeaderContainer>
      )}
      {localLoadState === global.LOAD_STATE_MAP.loading ? (
        <StyledCircularProgress />
      ) : (
        uploadedFiles.length > 0 && (
          <S.UploadedFiles>
            {uploadedFiles.map((file, index) => (
              <AttachmentBubble
                key={index}
                handleDelete={handleDeleteFile}
                attachmentData={file}
                index={index}
              />
            ))}
          </S.UploadedFiles>
        )
      )}
      <FileUpload onDropHandeler={onDropHandeler} />
    </S.Wrapper>
  )
}

export default Attachments

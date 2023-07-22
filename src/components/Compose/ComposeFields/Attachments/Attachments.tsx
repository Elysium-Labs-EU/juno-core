/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import AttachmentBubble from 'components/Elements/AttachmentBubble/AttachmentBubble'
import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import FileUpload from 'components/Elements/FileUpload/FileUpload'
import CustomToast from 'components/Elements/Toast/Toast'
import { EmailAttachmentType } from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import * as local from 'constants/composeEmailConstants'
import * as global from 'constants/globalConstants'
import convertB64AttachmentToFile from 'utils/convertB64AttachmentToFile'
import isEqual from 'utils/isEqual/isEqual'
import formatBytes from 'utils/prettierBytes'

import * as S from './AttachmentsStyles'

const ATTACHMENTS = 'Attachments'
const MAX_MB_UPLOAD_DIRECT = 25000000

const customIsEqual = (
  composeValue: Array<File> | Array<EmailAttachmentType> | undefined,
  uploadedFiles: Array<File>
) =>
  isEqual(
    composeValue?.map((item: File | EmailAttachmentType) => ({
      size: 'size' in item ? item.size : item.body.size,
      name: 'name' in item ? item.name : item.filename,
    })),
    uploadedFiles.map((item: File) => ({
      size: item.size,
      name: item.name,
    }))
  )

interface IAttachments {
  composeValue: Array<File> | Array<EmailAttachmentType> | undefined
  hasInteracted: boolean
  loadState: string
  messageId: string | undefined
  setHasInteracted: (value: boolean) => void
  updateComposeEmail: (action: { id: string; value: Array<File> }) => void
}

const Attachments = ({
  messageId,
  composeValue,
  updateComposeEmail,
  loadState,
  setHasInteracted,
  hasInteracted,
}: IAttachments) => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([])
  const [localLoadState, setLocalLoadState] = useState(
    global.LOAD_STATE_MAP.idle
  )

  //! Watch out for a loop, where the draft update on the parent component keeps sending new attachments as preset values.
  /**
   * This function will read the composeValue, if there are objects in there which are not of type File, it will download the file data and convert it to a File.
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
          const noneFileTypeItems: EmailAttachmentType[] = []
          composeValue.forEach((item: File | EmailAttachmentType) => {
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
            composeValue.forEach((item: File | EmailAttachmentType) => {
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
            toast.custom((t) => (
              <CustomToast
                variant="error"
                specificToast={t}
                title="Unable to restore attachments."
              />
            ))

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

  const syncStateWithParentComponent = (updatedFiles: Array<File>) => {
    const updateEventObject = {
      id: local.FILES,
      value: updatedFiles,
    }
    updateComposeEmail(updateEventObject)
  }

  const onDropHandeler = useCallback(
    (data: File[]) => {
      if (data.some((item) => item.size > MAX_MB_UPLOAD_DIRECT)) {
        toast.custom((t) => (
          <CustomToast
            variant="error"
            specificToast={t}
            title={`File size can not exceed ${formatBytes(
              MAX_MB_UPLOAD_DIRECT
            )}`}
          />
        ))
        return
      }
      // if (data.every((item) => item.type.includes('image'))) {
      //     if (data.every((item) => !/bmp|x-icon|tiff/.test(item.type))) {
      setUploadedFiles((prevState) => {
        syncStateWithParentComponent([...prevState, ...data])

        return [...prevState, ...data]
      })

      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [uploadedFiles, composeValue, hasInteracted]
  )

  const handleDeleteFile = useCallback(
    (index: number) => {
      setUploadedFiles((prevState) => {
        const newState = prevState.filter(
          (item) => prevState.indexOf(item) !== index
        )
        syncStateWithParentComponent(newState)
        return newState
      })
      if (!hasInteracted) {
        setHasInteracted(true)
      }
    },
    [uploadedFiles, hasInteracted]
  )

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

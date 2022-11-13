import {
  IEmailAttachmentType,
  IFetchedAttachment,
} from '../../EmailDetail/Attachment/EmailAttachmentTypes'
import * as global from '../../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { selectActiveModal, setActiveModal } from '../../../store/utilsSlice'
import CustomModal from '../Modal/CustomModal'

const AttachmentModal = ({
  fetchedAttachmentData,
  attachmentData,
}: {
  fetchedAttachmentData: IFetchedAttachment | null
  attachmentData: IEmailAttachmentType
}) => {
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(setActiveModal(null))
  }
  return (
    <CustomModal
      open={activeModal === global.ACTIVE_MODAL_MAP.attachment}
      handleClose={handleClose}
      modalTitle={attachmentData?.filename}
      modalAriaLabel="attachment"
    >
      {fetchedAttachmentData?.mimeType?.substring(0, 5) === 'image' ? (
        <img
          src={fetchedAttachmentData?.blobUrl ?? undefined}
          alt={attachmentData?.filename ?? 'undefined'}
        />
      ) : (
        <h2>File Format {fetchedAttachmentData?.mimeType} is not supported</h2>
      )}
    </CustomModal>
  )
}

export default AttachmentModal

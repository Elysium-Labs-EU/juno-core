import * as global from '../../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  selectActiveModal,
  setActiveModal,
} from '../../../store/utilsSlice'
import CustomModal from '../Modal/CustomModal'


const AttachmentModal = ({
  blobUrl,
  mimeType = "application/pdf",
} : {
  blobUrl: string
  mimeType: string
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
    modalTitle="View Attachment"
    modalAriaLabel="attachment"
    >
      {mimeType.substring(0,5) === "image" ? (
        <img src={blobUrl} />
      ) : (
        <h2>File Format {mimeType} is not supported</h2>
      )}
    </CustomModal>
  )
}

export default AttachmentModal
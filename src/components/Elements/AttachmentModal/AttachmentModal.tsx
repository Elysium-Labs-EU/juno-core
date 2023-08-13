import type {
  EmailAttachmentType,
  IFetchedAttachment,
} from 'components/EmailDetail/Attachment/EmailAttachmentTypes'
import * as global from 'constants/globalConstants'
import { useAppSelector } from 'store/hooks'
import { selectActiveModal } from 'store/utilsSlice'
import { Paragraph } from 'styles/globalStyles'

import CustomModal from '../Dialog/CustomDialog'

const AttachmentModal = ({
  fetchedAttachmentData,
  attachmentData,
}: {
  fetchedAttachmentData: IFetchedAttachment | null
  attachmentData: EmailAttachmentType
}) => {
  const activeModal = useAppSelector(selectActiveModal)

  return (
    <CustomModal
      open={
        activeModal ===
        `${global.ACTIVE_MODAL_MAP.attachment}${attachmentData.body.attachmentId}`
      }
      modalTitle={attachmentData.filename}
      modalAriaLabel="attachment"
    >
      {fetchedAttachmentData?.mimeType?.includes('image') ? (
        <img
          src={fetchedAttachmentData.blobUrl ?? undefined}
          alt={attachmentData.filename}
        />
      ) : (
        <Paragraph muted="true">
          This file in format {fetchedAttachmentData?.mimeType} is not yet
          supported
        </Paragraph>
      )
      }
    </CustomModal >
  )
}

export default AttachmentModal

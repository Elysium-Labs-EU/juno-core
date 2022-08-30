import { FiPaperclip } from 'react-icons/fi'
import { IEmailMessagePayloadRaw } from '../../store/storeTypes/emailListTypes'

/**
 * 
 * @param {files} - takes in the files from the Redux state 
 * @returns a paperclip if it has files otherwise an empty div
 */

const EmailHasAttachmentSimple = (
  { files }: { files: IEmailMessagePayloadRaw[] | undefined }
) => {
  if (files && files.length > 0) {
    return <FiPaperclip data-testid="email-has-attachment" />
  }
  return <div data-testid="email-has-no-attachment" />
}

export default EmailHasAttachmentSimple

import { QiAttachment } from 'images/svgIcons/quillIcons'
import { IEmailMessagePayloadRaw } from 'store/storeTypes/emailListTypes'

/**
 * @component EmailHasAttachmentSimple
 * @param {files} - takes in the files from the Redux state
 * @returns a paperclip if it has files otherwise an empty div
 */

const ICON_SIZE = 18

const EmailHasAttachmentSimple = ({
  files,
}: {
  files: IEmailMessagePayloadRaw[] | undefined
}) => {
  if (files && files.length > 0) {
    return <QiAttachment size={ICON_SIZE} data-testid="email-has-attachment" />
  }
  return <div data-testid="email-has-no-attachment" />
}

export default EmailHasAttachmentSimple

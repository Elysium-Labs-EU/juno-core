import { useState } from 'react'
import prettyBytes from 'pretty-bytes'
import { FiCheck, FiDownload, FiX } from 'react-icons/fi'
import * as S from '../../../EmailDetail/Attachment/EmailAttachmentBubbleStyles'
import * as GS from '../../../../styles/globalStyles'
import * as global from '../../../../constants/globalConstants'
import EmailAttachmentIcon from '../../../EmailDetail/Attachment/EmailAttachmentIcon'
import CustomIconButton from '../../../Elements/Buttons/CustomIconButton'
import { IFile } from './Attachments'

const ICON_SIZE = 20

const AttachmentBubble = ({
  file,
  handleDelete,
  index,
}: {
  file: IFile
  handleDelete: Function
  index: number
}) => {
  const [downloaded, setDownloaded] = useState(false)
  // const dispatch = useAppDispatch()

  const handleDownload = () => {
    // dispatch(downloadAttachment({ messageId, attachmentData }))
    setDownloaded(true)
  }

  return (
    <S.Attachment>
      <EmailAttachmentIcon mimeType={file?.type} />
      <S.AttachmentInner>
        <span>{file.name}</span>{' '}
        <GS.TextMutedSmall style={{ margin: 0 }}>
          {global.FILE}
          {prettyBytes(file.size)}
        </GS.TextMutedSmall>
      </S.AttachmentInner>
      <CustomIconButton
        title="Download"
        onClick={handleDownload}
        icon={
          !downloaded ? (
            <FiDownload size={ICON_SIZE} />
          ) : (
            <FiCheck size={ICON_SIZE} />
          )
        }
      />
      <CustomIconButton
        title="Remove"
        onClick={() => handleDelete(index)}
        icon={<FiX size={ICON_SIZE} />}
      />
    </S.Attachment>
  )
}

export default AttachmentBubble

import { FiFile, FiFilm, FiFileText, FiImage } from 'react-icons/fi'
import * as S from './AttachmentBubbleStyles'

const ICON_SIZE = 20

const getIcon = (mimeType: string) => {
  if (mimeType.includes('image')) {
    return <FiImage size={ICON_SIZE} />
  }
  if (mimeType.includes('text')) {
    return <FiFileText size={ICON_SIZE} />
  }
  if (mimeType.includes('video')) {
    return <FiFilm size={ICON_SIZE} />
  }
  return <FiFile size={ICON_SIZE} />
}

export default function EmailAttachmentIcon({
  mimeType,
}: {
  mimeType: string
}) {
  return <S.IconContainer>{getIcon(mimeType)}</S.IconContainer>
}

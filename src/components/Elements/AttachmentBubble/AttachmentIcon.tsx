import { FiFile, FiFilm, FiFileText, FiImage } from 'react-icons/fi'
import * as S from './AttachmentBubbleStyles'

const ICON_SIZE = 20

export default function EmailAttachmentIcon({
  mimeType,
}: {
  mimeType: string
}) {
  const iconMap: { [key: string]: JSX.Element } = {
    'image/png': <FiImage size={ICON_SIZE} />,
    'text/plain': <FiFileText size={ICON_SIZE} />,
    'video/mp4': <FiFilm size={ICON_SIZE} />,
    'application/pdf': <FiFile size={ICON_SIZE} />,
    'application/octet-stream': <FiFile size={ICON_SIZE} />,
    default: <FiFile size={ICON_SIZE} />,
  }

  return (
    <S.IconContainer>
      {mimeType ? iconMap[mimeType] : iconMap.default}
    </S.IconContainer>
  )
}

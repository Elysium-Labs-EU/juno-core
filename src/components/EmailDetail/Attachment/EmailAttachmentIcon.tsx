import { FiFile, FiFilm, FiFileText, FiImage } from 'react-icons/fi'
import * as S from './EmailAttachmentBubbleStyles'

export default function EmailAttachmentIcon({
  mimeType,
}: {
  mimeType: string
}) {
  const iconMap: { [key: string]: JSX.Element } = {
    'image/png': <FiImage size={20} />,
    'text/plain': <FiFileText size={20} />,
    'video/mp4': <FiFilm size={20} />,
    'application/pdf': <FiFile size={20} />,
    default: <FiFile size={20} />,
  }

  return (
    <S.IconContainer>
      {mimeType ? iconMap[mimeType] : iconMap.default}
    </S.IconContainer>
  )
}

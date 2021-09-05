import React from 'react'
import { FiFile, FiFilm, FiFileText, FiImage } from 'react-icons/fi'

export default function Skillicon({ mimeType }) {
  const iconMap = {
    'image/png': <FiImage size={20} />,
    'text/plain': <FiFileText size={20} />,
    'video/mp4': <FiFilm size={20} />,
    'application/pdf': <FiFile size={20} />,
    default: <FiFile size={20} />,
  }

  return <>{(mimeType && iconMap[mimeType]) || iconMap.default}</>
}

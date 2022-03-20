/* eslint-disable react/no-array-index-key */
import { useState } from 'react'
import FileUpload from '../../../Elements/FileUpload/FileUpload'
import AttachmentBubble from './AttachmentBubble'
import * as S from './AttachmentsStyles'

export interface IFile {
  path: string
  name: string
  lastModified: number
  size: number
  type: string
  webkitRelativePath: string
}

const Attachments = () => {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([])

  const handleDelete = (index: number) => {
    setUploadedFiles((prevState) =>
      prevState.filter((item) => prevState.indexOf(item) !== index)
    )
  }

  return (
    <S.Wrapper>
      <FileUpload
        setUploadedFiles={setUploadedFiles}
        uploadedFiles={uploadedFiles}
      />
      {uploadedFiles.length > 0 && (
        <S.UploadedFiles>
          {uploadedFiles.map((file, index) => (
            <AttachmentBubble
              key={index}
              handleDelete={handleDelete}
              file={file}
              index={index}
            />
          ))}
        </S.UploadedFiles>
      )}
    </S.Wrapper>
  )
}

export default Attachments

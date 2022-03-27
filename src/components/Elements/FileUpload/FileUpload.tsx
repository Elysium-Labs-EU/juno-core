/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiPaperclip } from 'react-icons/fi'
import * as S from './FileUploadStyles'

const DRAG_DROP = 'Drag and drop some files here, or click to select files'
const DROP_FILES = 'Drop the files here ...'

const FileUpload = ({ setUploadedFiles }: { setUploadedFiles: Function }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles)
    setUploadedFiles((prevState: any) => [...prevState, ...acceptedFiles])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <S.Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>{DROP_FILES}</p>
      ) : (
        <S.Inner>
          <FiPaperclip />
          <p>{DRAG_DROP}</p>
        </S.Inner>
      )}
    </S.Wrapper>
  )
}

export default FileUpload

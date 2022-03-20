/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import * as S from './FileUploadStyles'

const FileUpload = ({
  setUploadedFiles,
  uploadedFiles,
}: {
  setUploadedFiles: Function
  uploadedFiles: any[]
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    // console.log(acceptedFiles)
    setUploadedFiles((prevState: any) => [...prevState, ...acceptedFiles])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <S.Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </S.Wrapper>
  )
}

export default FileUpload

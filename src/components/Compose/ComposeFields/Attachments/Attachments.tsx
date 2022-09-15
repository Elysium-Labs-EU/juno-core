/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useState } from 'react'
import AttachmentBubble from '../../../Elements/AttachmentBubble/AttachmentBubble'

import FileUpload from '../../../Elements/FileUpload/FileUpload'

import * as S from './AttachmentsStyles'

const ATTACHMENTS = 'Attachments'

const Attachments = ({
    onChange
}: {
    onChange: (value: File[]) => void
}) => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [fileTypeError, setFileTypeError] = useState<string | null>(null)

    // Sync the state with the parent component
    useEffect(() => {
        onChange(uploadedFiles)
    }, [uploadedFiles])

    const onDropHandeler = useCallback(
        (data: File[]) => {
            console.log('here', data)
            // if (data.every((item) => item.type.includes('image'))) {
            //     if (data.every((item) => !/bmp|x-icon|tiff/.test(item.type))) {
            setUploadedFiles((prevState) => [...prevState, ...data])
            //         return
            //     }
            //     setFileTypeError(
            //         'Image cannot be of type .bmp .ico, or .tiff - all others are allowed.'
            //     )
            //     return
            // }
            // setFileTypeError('File must be an image')
        },
        [uploadedFiles]
    )

    const handleDeleteFile = useCallback((index: number) => {
        setUploadedFiles((prevState) =>
            prevState.filter((item) => prevState.indexOf(item) !== index)
        )
    }, [uploadedFiles])


    return (
        <S.Wrapper>
            <S.AttachmentHeaderContainer>
                <S.StyledBadge badgeContent={uploadedFiles.length} color="primary">
                    <S.AttachmentHeader>{ATTACHMENTS}</S.AttachmentHeader>
                </S.StyledBadge>
            </S.AttachmentHeaderContainer>
            {uploadedFiles.length > 0 && (
                <S.UploadedFiles>
                    {uploadedFiles.map((file, index) => (
                        <AttachmentBubble
                            key={index}
                            handleDelete={handleDeleteFile}
                            attachmentData={file}
                            index={index}
                        />
                    ))}
                </S.UploadedFiles>
            )}
            <FileUpload onDropHandeler={onDropHandeler} />
        </S.Wrapper>
    )
}

export default Attachments

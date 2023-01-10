import { useCallback, useState } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import StyledCircularProgress from 'components/Elements/CircularProgress/StyledCircularProgress'
import * as global from 'constants/globalConstants'
import { QiCheckmark, QiDownload } from 'images/svgIcons/quillIcons'
import { useAppDispatch } from 'store/hooks'
import type { IEmailMessagePayloadRaw } from 'store/storeTypes/emailListTypes'
import { setSystemStatusUpdate } from 'store/utilsSlice'
import { downloadAttachmentMultiple } from 'utils/downloadAttachment'

interface IDownloadButtonMultiple {
  filesObjectArray: {
    id: string
    files: IEmailMessagePayloadRaw[] | undefined
  }[]
  isMainButton?: boolean
}

const asssesUniqueFiles = ({
  filesObjectArray,
}: Pick<IDownloadButtonMultiple, 'filesObjectArray'>) => {
  const processedFiles = new Set()
  const uniqueFiles: Pick<
    IDownloadButtonMultiple,
    'filesObjectArray'
  >['filesObjectArray'] = []

  filesObjectArray.forEach((fileObject) => {
    if (fileObject?.files) {
      uniqueFiles.push({
        id: fileObject.id,
        files: fileObject.files.filter((file) => {
          const { filename, body } = file
          const fileKey = `${filename}-${body.size}`
          if (processedFiles.has(fileKey)) {
            return undefined
          }
          processedFiles.add(fileKey)
          return file
        }),
      })
    }
  })
  return uniqueFiles
}

const ICON_SIZE = 13

const RenderIcon = ({
  downloaded,
  loadState,
}: {
  downloaded: boolean
  loadState: string
}) => {
  if (loadState === global.LOAD_STATE_MAP.loading) {
    return <StyledCircularProgress size={ICON_SIZE} />
  }
  if (downloaded) {
    return <QiCheckmark size={ICON_SIZE} />
  }
  return <QiDownload size={ICON_SIZE} />
}

const DownloadButtonMultiple = ({
  filesObjectArray,
  isMainButton = false,
}: IDownloadButtonMultiple) => {
  const [loadState, setLoadState] = useState(global.LOAD_STATE_MAP.idle)
  const [downloaded, setDownloaded] = useState(false)
  const dispatch = useAppDispatch()

  const handleClick = useCallback(async () => {
    setLoadState(global.LOAD_STATE_MAP.loading)
    try {
      const buffer: Array<
        Promise<
          | { success: boolean; message: string }
          | { success: boolean; message: null }
          | null
        >
      > = []
      asssesUniqueFiles({ filesObjectArray }).forEach((object) =>
        buffer.push(
          downloadAttachmentMultiple({
            attachmentData: object.files,
            messageId: object.id,
          })
        )
      )
      const response = await Promise.all(buffer)
      // The response is only one object in the array.
      if (response[0]?.success) {
        setDownloaded(true)
        setLoadState(global.LOAD_STATE_MAP.loaded)
        return
      }
      setLoadState(global.LOAD_STATE_MAP.error)
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: response
            ? response[0]?.message ?? global.NETWORK_ERROR
            : global.NETWORK_ERROR,
        })
      )
    } catch (err) {
      setLoadState(global.LOAD_STATE_MAP.error)
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: global.NETWORK_ERROR,
        })
      )
    }
  }, [])

  const handleLabel = () => {
    if (filesObjectArray.length > 0 && isMainButton) {
      return 'Download all files'
    }
    return `Download ${
      filesObjectArray[0]?.files ? filesObjectArray[0].files.length : 0
    } files`
  }

  return (
    <CustomButton
      onClick={handleClick}
      label={handleLabel()}
      icon={<RenderIcon downloaded={downloaded} loadState={loadState} />}
      title={
        !downloaded
          ? 'Download all the attachments of this message with one click'
          : 'Attachments downloaded'
      }
      suppressed
    />
  )
}

export default DownloadButtonMultiple

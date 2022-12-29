import { useCallback, useState } from 'react'

import CustomButton from 'components/Elements/Buttons/CustomButton'
import StyledCircularProgress from 'components/Elements/StyledCircularProgress'
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
  const uniqueFiles = filesObjectArray.reduce((accumulator, currentValue) => {
    // Check if there is another file in the accumulator with the same name and size
    const duplicate = accumulator.some((fileObject) => {
      if (fileObject.files && currentValue.files) {
        return fileObject.files.some((file) => {
          if (currentValue?.files && currentValue.files[0]) {
            return (
              file.filename === currentValue.files[0].filename &&
              file.body.size === currentValue.files[0].body.size
            )
          }
          return false
        })
      }
      return false
    })

    // Add the current file to the accumulator if there is no duplicate
    if (!duplicate && currentValue && currentValue?.files?.length) {
      accumulator.push(currentValue)
    }
    return accumulator
  }, [] as Pick<IDownloadButtonMultiple, 'filesObjectArray'>['filesObjectArray'])

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
      const buffer: any = []
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
          message: response[0].message ?? global.NETWORK_ERROR,
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

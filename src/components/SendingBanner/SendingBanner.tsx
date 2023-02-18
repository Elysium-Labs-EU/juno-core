import Snackbar from '@mui/material/Snackbar'
import { useCallback, useEffect, useState } from 'react'

import { QiSend, QiWarningAlt } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
// import CustomButton from '../Elements/Buttons/CustomButton'
// import * as themeConstants from 'constants/themeConstants'
import { IMessageSendStatus } from 'store/storeTypes/utilsTypes'
import { selectIsSending, setIsSending } from 'store/utilsSlice'

import * as S from './SendingBannerStyles'

const THREE_SECONDS = 3000

interface IMessageSendStatusWithKey extends IMessageSendStatus {
  key: number
}

const iconMap: { [key: string]: JSX.Element } = {
  info: <QiSend />,
  success: <QiSend />,
  error: <QiWarningAlt />,
  default: <QiSend />,
}

const SendingBanner = () => {
  const isSending = useAppSelector(selectIsSending)
  const dispatch = useAppDispatch()
  const [snackPack, setSnackPack] = useState<
    readonly IMessageSendStatusWithKey[]
  >([])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<
    IMessageSendStatusWithKey | undefined
  >(undefined)

  useEffect(() => {
    if (isSending) {
      setSnackPack((prev) => [
        ...prev,
        {
          message: isSending.message,
          key: isSending.timestamp,
          type: isSending.type,
        },
      ])
    }
  }, [isSending])

  useEffect(() => {
    let timer: undefined | ReturnType<typeof setTimeout>
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      const [firstItem] = snackPack
      if (firstItem) {
        setMessageInfo({ ...firstItem })
        setSnackPack((prev) => prev.slice(1))
        setOpen(true)
      }
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added, but only after minimal 2000 ms.
      timer = setTimeout(() => {
        setOpen(false)
      }, 2000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [snackPack, messageInfo, open])

  const handleClose = useCallback(
    (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen(false)
    },
    []
  )

  const handleExited = () => {
    if (messageInfo && isSending && messageInfo.key === isSending.timestamp) {
      dispatch(setIsSending(null))
    }
    setMessageInfo(undefined)
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={THREE_SECONDS}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      {isSending ? (
        <S.Banner>
          <S.Inner>
            <S.MessageIcon>
              {iconMap[isSending.type]}
              <span style={{ marginLeft: '10px' }}>{isSending.message}</span>
            </S.MessageIcon>
            {/* <CustomButton
            label="No no stop"
            title="Click to undo sending"
            onClick={() => {}}
            style={{ color: `${themeConstants.color.white}` }}
          /> */}
          </S.Inner>
        </S.Banner>
      ) : undefined}
    </Snackbar>
  )
}

export default SendingBanner

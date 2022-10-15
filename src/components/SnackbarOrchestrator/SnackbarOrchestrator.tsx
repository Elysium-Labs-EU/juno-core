import { useCallback, useEffect, useState } from 'react'

import { Alert } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'

import { QiEscape } from '../../images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { TUpdateType } from '../../store/storeTypes/utilsTypes'
import {
  selectSystemStatusUpdate,
  setSystemStatusUpdate,
} from '../../store/utilsSlice'

interface ISnackbarMessage {
  message: string
  key: number
  type: TUpdateType
}

const SIX_SECONDS = 6000

/**
 * The component listens to the Redux store for systemStatusUpdates state object.
 * @returns {JSX.Element} a snackbar with the content.
 */

const SystemUpdateSnackbarOrchestrator = () => {
  const systemStatusUpdate = useAppSelector(selectSystemStatusUpdate)
  const dispatch = useAppDispatch()
  const [snackPack, setSnackPack] = useState<readonly ISnackbarMessage[]>([])
  const [open, setOpen] = useState(false)
  const [messageInfo, setMessageInfo] = useState<ISnackbarMessage | undefined>(
    undefined
  )

  useEffect(() => {
    if (systemStatusUpdate) {
      setSnackPack((prev) => [
        ...prev,
        {
          message: systemStatusUpdate.message,
          key: systemStatusUpdate.timestamp,
          type: systemStatusUpdate.type,
        },
      ])
    }
  }, [systemStatusUpdate])

  useEffect(() => {
    let timer: undefined | ReturnType<typeof setTimeout>
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
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
    if (
      messageInfo &&
      systemStatusUpdate &&
      messageInfo.key === systemStatusUpdate.timestamp
    ) {
      dispatch(setSystemStatusUpdate(null))
    }
    setMessageInfo(undefined)
  }

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={SIX_SECONDS}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
    >
      {messageInfo ? (
        <Alert
          severity={messageInfo.type ?? 'success'}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <QiEscape />
            </IconButton>
          }
        >
          {messageInfo.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  )
}

export default SystemUpdateSnackbarOrchestrator

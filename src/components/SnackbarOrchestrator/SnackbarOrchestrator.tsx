import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import { useCallback, useEffect, useState } from 'react'

import { QiEscape } from 'images/svgIcons/quillIcons'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import type { AppDispatch } from 'store/store'
import type { ISystemStatusUpdate } from 'store/storeTypes/utilsTypes'
import {
  selectSystemStatusUpdate,
  setSystemStatusUpdate,
} from 'store/utilsSlice'
import copyToClipboard from 'utils/copyToClipboard/copyToClipboard'

interface ISnackbarMessage extends ISystemStatusUpdate {
  key: number
}

const SIX_SECONDS = 6000

const handleOpenLink = ({
  action,
  dispatch,
}: {
  action: string | undefined
  dispatch: AppDispatch
}) => {
  if (action) {
    const newWindow = window.open(action)

    setTimeout(() => {
      if (newWindow?.closed || !newWindow) {
        const messageContent =
          'Unable to open link at this time. Please try copying and pasting the link in your browser.'
        dispatch(
          setSystemStatusUpdate({
            type: 'error',
            message: messageContent,
            actionType: 'copy',
            action,
          })
        )
      }
    }, 1000)
  }
}

const handleCopyToClipBoard = async ({
  action,
  dispatch,
}: {
  action: string | undefined
  dispatch: AppDispatch
}) => {
  if (action) {
    const result = await copyToClipboard(action)
    if (result) {
      dispatch(
        setSystemStatusUpdate({
          type: 'success',
          message: 'Link successfully copied to clipboard.',
        })
      )
    } else {
      dispatch(
        setSystemStatusUpdate({
          type: 'error',
          message: 'Link copy to clipboard failed.',
        })
      )
    }
  }
}

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
          action: systemStatusUpdate?.action,
          actionType: systemStatusUpdate.actionType,
        },
      ])
    }
  }, [systemStatusUpdate])

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

  const handleClose = useCallback((_: unknown | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }, [])

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

  const buttonMap = {
    copy: (
      <Button
        color="inherit"
        size="small"
        onClick={() =>
          handleCopyToClipBoard({ action: messageInfo?.action, dispatch })
        }
      >
        Copy
      </Button>
    ),
    // undo: (
    //   <Button color="inherit" size="small">
    //     Undo
    //   </Button>
    // ),
    close: (
      <IconButton
        aria-label="close"
        color="inherit"
        sx={{ p: 0.5 }}
        onClick={handleClose}
      >
        <QiEscape />
      </IconButton>
    ),
    unsubscribe: (
      <Button
        color="inherit"
        size="small"
        onClick={() =>
          handleOpenLink({ action: messageInfo?.action, dispatch })
        }
      >
        Open link
      </Button>
    ),
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
          action={buttonMap[messageInfo?.actionType as keyof typeof buttonMap]}
        >
          {messageInfo.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  )
}

export default SystemUpdateSnackbarOrchestrator

import { Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { setServiceUnavailable } from '../../../store/utilsSlice'

const SIX_SECONDS = 6000

const SnackbarNotification = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch()

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setServiceUnavailable(''))
    setOpen(false)
  }

  return text ? (
    <Snackbar open={open} autoHideDuration={SIX_SECONDS} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  ) : null
}

export default SnackbarNotification

import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { CustomButtonText } from '../Elements/Buttons'

const SPAM_BUTTON = 'Clear spam'
const DIALOG_HEADER = 'Confirm deleting messages'
const DIALOG_CONTENT =
  'This action will affect all conversations in Spam. Are you sure you want to continue?'
const CANCEL_BUTTON = 'Cancel'
const OK_BUTTON = 'OK'

const mapStateToProps = (state) => {
  const { metaList, emailList, labelIds, isLoading } = state
  return { metaList, emailList, labelIds, isLoading }
}

const Spamclearoption = ({ isLoading }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const archiveAllSpam = () => {
    setOpen(false)
    console.log('remove spam')
  }

  return (
    <>
      <CustomButtonText
        className="sort-button"
        onClick={handleClickOpen}
        disabled={isLoading}
        label={SPAM_BUTTON}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{DIALOG_HEADER}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {DIALOG_CONTENT}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {CANCEL_BUTTON}
          </Button>
          <Button
            variant="contained"
            onClick={archiveAllSpam}
            color="primary"
            autoFocus
          >
            {OK_BUTTON}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default connect(mapStateToProps)(Spamclearoption)

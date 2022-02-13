import Modal from '@mui/material/Modal'
import FormGroup from '@mui/material/FormGroup'
import { selectIsSettingsOpen, setIsSettingsOpen } from '../../Store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import * as S from './SettingsStyles'
import ShowAvatar from './SettingsOptions/ShowAvatar/ShowAvatar'
import EmailSize from './SettingsOptions/EmailSize/EmailSize'

const handleClose = (dispatch: Function) => dispatch(setIsSettingsOpen(false))

const SETTINGS = 'Settings'

const Settings = () => {
  const dispatch = useAppDispatch()
  const isSettingsOpen = useAppSelector(selectIsSettingsOpen)

  return (
    <Modal
      open={isSettingsOpen}
      onClose={() => handleClose(dispatch)}
      aria-labelledby="modal-search"
      aria-describedby="modal-search-box"
    >
      <S.Dialog>
        <S.SettingsHeader>{SETTINGS}</S.SettingsHeader>
        <S.SettingsContainer>
          <FormGroup>
            <ShowAvatar />
            <EmailSize />
          </FormGroup>
        </S.SettingsContainer>
      </S.Dialog>
    </Modal>
  )
}

export default Settings

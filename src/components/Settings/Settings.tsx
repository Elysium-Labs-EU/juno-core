import Modal from '@mui/material/Modal'
import { selectIsSettingsOpen, setIsSettingsOpen } from '../../Store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import * as S from './SettingsStyles'
import ShowAvatar from './SettingsOptions/ShowAvatar/ShowAvatar'
import EmailSize from './SettingsOptions/EmailSize/EmailSize'
import Contributions from './Contributions/contributions'

const handleClose = (dispatch: Function) => dispatch(setIsSettingsOpen(false))

const SETTINGS = 'Settings'
const CONTRIBUTIONS = 'Contributions'

const Settings = () => {
  const dispatch = useAppDispatch()
  const isSettingsOpen = useAppSelector(selectIsSettingsOpen)

  return (
    <Modal
      open={isSettingsOpen}
      onClose={() => handleClose(dispatch)}
      aria-labelledby="modal-settings"
      aria-describedby="modal-settings-box"
    >
      <S.Dialog>
        <S.SettingsHeader>{SETTINGS}</S.SettingsHeader>
        <S.SettingsContainer>
          <ShowAvatar />
          <EmailSize />
          <S.SettingsSubHeader>{CONTRIBUTIONS}</S.SettingsSubHeader>
          <Contributions />
        </S.SettingsContainer>
      </S.Dialog>
    </Modal>
  )
}

export default Settings

import Modal from '@mui/material/Modal'
import { FiX } from 'react-icons/fi'
import { selectIsSettingsOpen, setIsSettingsOpen } from '../../store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import * as S from './SettingsStyles'
import ShowAvatar from './SettingsOptions/ShowAvatar/ShowAvatar'
import EmailSize from './SettingsOptions/EmailSize/EmailSize'
import Contributions from './Contributions/contributions'
import CustomIconButton from '../Elements/Buttons/CustomIconButton'

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
        <S.SettingsTop>
          <S.SettingsHeader>{SETTINGS}</S.SettingsHeader>
          <CustomIconButton
            onClick={() => handleClose(dispatch)}
            aria-label="close-modal"
            icon={<FiX size={16} />}
          />
        </S.SettingsTop>
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

import { selectIsSettingsOpen, setIsSettingsOpen } from '../../store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import * as S from './SettingsStyles'
import ShowAvatar from './SettingsOptions/ShowAvatar/ShowAvatar'
import EmailSize from './SettingsOptions/EmailSize/EmailSize'
import Contributions from './Contributions/contributions'
import { AppDispatch } from '../../store/store'
import CustomModal from '../Elements/Modal/CustomModal'

const handleClose = (dispatch: AppDispatch) =>
  dispatch(setIsSettingsOpen(false))

const SETTINGS = 'Settings'
const CONTRIBUTIONS = 'Contributions'

const Settings = () => {
  const dispatch = useAppDispatch()
  const isSettingsOpen = useAppSelector(selectIsSettingsOpen)

  return (
    <CustomModal
      open={isSettingsOpen}
      handleClose={() => handleClose(dispatch)}
      modalTitle={SETTINGS}
      modalAriaLabel="settings"
    >
      <S.SettingsContainer>
        <ShowAvatar />
        <EmailSize />
        <S.SettingsSubHeader>{CONTRIBUTIONS}</S.SettingsSubHeader>
        <Contributions />
      </S.SettingsContainer>
    </CustomModal>
  )
}

export default Settings

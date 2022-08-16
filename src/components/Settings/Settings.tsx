import { selectActiveModal, setActiveModal } from '../../store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import * as S from './SettingsStyles'
import ShowAvatar from './SettingsOptions/ShowAvatar/ShowAvatar'
import EmailSize from './SettingsOptions/EmailSize/EmailSize'
import Contributions from './Contributions/contributions'
import CustomModal from '../Elements/Modal/CustomModal'
import * as global from '../../constants/globalConstants'

const SETTINGS = 'Settings'
const CONTRIBUTIONS = 'Contributions'

const Settings = () => {
  const dispatch = useAppDispatch()
  const activeModal = useAppSelector(selectActiveModal)

  return (
    <CustomModal
      open={activeModal === global.ACTIVE_MODAL_MAP.settings}
      handleClose={() => dispatch(setActiveModal(null))}
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

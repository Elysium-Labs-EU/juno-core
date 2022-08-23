import { useState } from 'react'
import { selectActiveModal, setActiveModal } from '../../store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import * as S from './SettingsStyles'
import Contributions from './Contributions/Contributions'
import CustomModal from '../Elements/Modal/CustomModal'
import * as global from '../../constants/globalConstants'
import SettingsSidebar from './SettingsSidebar/SettingsSidebar'
import General from './General/General'
import Signature from './Signature/Signature'

const SETTINGS = 'Settings'

const Settings = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(0)
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
        <SettingsSidebar
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />
        {activeMenuItem === 0 && <General />}
        {activeMenuItem === 1 && <Signature />}
        {activeMenuItem === 2 && <Contributions />}
      </S.SettingsContainer>
    </CustomModal>
  )
}

export default Settings

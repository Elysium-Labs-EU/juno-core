import { useEffect } from 'react'
import Switch from '@mui/material/Switch'
import Modal from '@mui/material/Modal'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import NativeSelect from '@mui/material/NativeSelect'
import Box from '@mui/material/Box'
import {
  setAvatarVisibility,
  selectIsSettingsOpen,
  setIsSettingsOpen,
  setShowAvatar,
  setEmailFetchSize,
  selectEmailListSize,
} from '../../Store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import * as S from './SettingsStyles'
import * as global from '../../constants/globalConstants'

const handleClose = (dispatch: Function) => dispatch(setIsSettingsOpen(false))

const SETTINGS = 'Settings'
const showAvatarLocalStorage = localStorage.getItem('showAvatar')

const Settings = () => {
  const dispatch = useAppDispatch()
  const isSettingsOpen = useAppSelector(selectIsSettingsOpen)
  const avatarVisible = useAppSelector(setAvatarVisibility)
  const fetchCount = useAppSelector(selectEmailListSize)

  const handleEmailListSizeChange = (e: any) => {
    localStorage.setItem('fetchSize', e.target.value)
    dispatch(setEmailFetchSize(e.target.value))
  }

  useEffect(() => {
    if (
      !showAvatarLocalStorage ||
      (showAvatarLocalStorage !== 'true' &&
        showAvatarLocalStorage !== 'false')
    ) {
      localStorage.setItem('showAvatar', 'true')
      dispatch(setShowAvatar(showAvatarLocalStorage === 'true'))
    }
  }, [])

  const switchAvatarView = () => {
    if (showAvatarLocalStorage === 'true') {
      localStorage.setItem('showAvatar', 'false')
      dispatch(setShowAvatar(false))
    } else {
      localStorage.setItem('showAvatar', 'true')
      dispatch(setShowAvatar(true))
    }
  }

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
            <FormControlLabel
              label="Do you want to see Avatars?"
              control={
                <Switch
                  onClick={() => switchAvatarView()}
                  checked={avatarVisible}
                />
              }
            />

            <FormControlLabel
              label="Emails Fetched at a time"
              control={
                <Box sx={{ minWidth: 25 }}>
                  <NativeSelect
                    defaultValue={fetchCount}
                    inputProps={{
                      name: 'emailSize',
                      id: 'uncontrolled-native',
                    }}
                    onChange={handleEmailListSizeChange}
                  >
                    {global.POSSIBLE_FETCH_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                  </NativeSelect>
                </Box>
              }
            />
          </FormGroup>
        </S.SettingsContainer>
      </S.Dialog>
    </Modal>
  )
}

export default Settings

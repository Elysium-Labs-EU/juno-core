import { useEffect } from 'react'
import Switch from '@mui/material/Switch'
import Modal from '@mui/material/Modal'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import {
  selectIsSettingsOpen,
  setIsSettingsOpen,
  setEmailFetchSize,
  selectEmailListSize,
} from '../../Store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'
import * as S from './SettingsStyles'
import * as global from '../../constants/globalConstants'
import ShowAvatar from './SettingsOptions/ShowAvatar/ShowAvatar'

const handleClose = (dispatch: Function) => dispatch(setIsSettingsOpen(false))

const SETTINGS = 'Settings'

const Settings = () => {
  const dispatch = useAppDispatch()
  const isSettingsOpen = useAppSelector(selectIsSettingsOpen)
  const fetchCount = useAppSelector(selectEmailListSize)

  const handleEmailListSizeChange = (e: any) => {
    localStorage.setItem('fetchSize', e.target.value)
    dispatch(setEmailFetchSize(e.target.value))
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
            <ShowAvatar />

            <FormControlLabel
              label="Emails Fetched at a time"
              control={
                <Box sx={{ minWidth: 25, marginRight: 0.5 }}>
                  <S.StyledSelect
                    value={fetchCount}
                    inputProps={{
                      name: 'emailSize',
                      id: 'uncontrolled-native',
                    }}
                    onChange={handleEmailListSizeChange}
                  >
                    {global.POSSIBLE_FETCH_SIZES.map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}
                      </MenuItem>
                    ))}
                  </S.StyledSelect>
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

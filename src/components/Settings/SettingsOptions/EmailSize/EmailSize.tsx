import { Box, FormControlLabel, MenuItem } from '@mui/material'
import * as S from '../../SettingsStyles'
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks'
import * as global from '../../../../constants/globalConstants'
import {
  setEmailFetchSize,
  selectEmailListSize,
} from '../../../../Store/utilsSlice'

const LABEL = 'Emails fetched at a time'

const EmailSize = () => {
  const fetchCount = useAppSelector(selectEmailListSize)
  const dispatch = useAppDispatch()

  const handleEmailListSizeChange = (e: any) => {
    localStorage.setItem('fetchSize', e.target.value)
    dispatch(setEmailFetchSize(e.target.value))
  }

  return (
    <FormControlLabel
      label={LABEL}
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
  )
}

export default EmailSize

import { Box, FormControlLabel, MenuItem } from '@mui/material'
import * as S from '../../SettingsStyles'
import { useAppDispatch, useAppSelector } from '../../../../Store/hooks'
import {
  setEmailFetchSize,
  selectEmailListSize,
  selectSettingsLabelId,
} from '../../../../Store/utilsSlice'
import updateSettingsLabel from '../../../../utils/Settings/updateSettingsLabel'
import { fetchSizeKeyMap } from '../../../../constants/baseConstants'

const LABEL = 'Emails fetched at a time'
const POSSIBLE_FETCH_SIZES = ['20', '25', '30', '35']

const EmailSize = () => {
  const fetchCount = useAppSelector(selectEmailListSize)
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const dispatch = useAppDispatch()

  const handleEmailListSizeChange = (e: any) => {
    updateSettingsLabel({
      settingsLabelId,
      fetchSize: fetchSizeKeyMap[e.target.value],
    })
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
              id: 'emailSize-select',
            }}
            onChange={handleEmailListSizeChange}
          >
            {POSSIBLE_FETCH_SIZES.map((size) => (
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

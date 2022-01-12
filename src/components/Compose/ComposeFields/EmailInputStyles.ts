import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import * as themeConstants from '../../../constants/themeConstants'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: `${themeConstants.greyBorder}`,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparant',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: `${themeConstants.colorPurpleSoft}`,
    },
    '&.MuiInputBase-sizeSmall': {
      padding: '0 6px',
    },
    '&.MuiInputBase-root': {
      background: `${themeConstants.slightWhite}`,
    },
  },
})

export default StyledTextField

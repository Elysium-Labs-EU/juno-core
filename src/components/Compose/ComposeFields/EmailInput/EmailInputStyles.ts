import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: `var(--color-grey-border)`,
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
      borderColor: `var(--color-purple-soft)`,
    },
    '&.MuiInputBase-sizeSmall': {
      padding: '0 6px',
    },
    '&.MuiInputBase-root': {
      background: `var(--color-white-slight)`,
    },
  },
})

export default StyledTextField

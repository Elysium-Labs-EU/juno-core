import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: `var(--color-neutral-200)`,
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
      borderColor: `var(--color-blue-100)`,
    },
    '&.MuiInputBase-sizeSmall': {
      padding: '0 6px',
    },
    '&.MuiInputBase-root': {
      background: `var(--color-white)`,
    },
  },
})

export default StyledTextField

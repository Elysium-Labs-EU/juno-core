import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

const StyledChip = styled(Chip)({
  borderRadius: '0.5rem',
  backgroundColor: `var(--color-grey-hover)`,
  border: `1px solid var(--color-grey-border)`,
  fontSize: '0.95rem',
  '&:hover': {
    borderColor: `var(--color-grey-hover)`,
    backgroundColor: `var(--color-purple-soft)`,
  },
})

export default StyledChip

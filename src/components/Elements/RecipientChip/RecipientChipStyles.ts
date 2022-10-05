import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'

const StyledChip = styled(Chip)({
  borderRadius: '0.5rem',
  backgroundColor: `var(--color-neutral-200)`,
  border: `1px solid var(--color-neutral-300)`,
  fontSize: '0.95rem',
  '&:hover': {
    borderColor: `var(--color-neutral-200)`,
    backgroundColor: `var(--color-blue-100)`,
  },
})

export default StyledChip

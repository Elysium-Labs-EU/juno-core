import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

const CustomCircularProgress = styled(CircularProgress)`
  color: var(--color-black) !important;
`

const StyledCircularProgress = ({ size = undefined }: { size?: number }) => (
  <CustomCircularProgress size={size} />
)

export default StyledCircularProgress

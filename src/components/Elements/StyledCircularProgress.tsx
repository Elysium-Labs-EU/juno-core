import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

const CustomCircularProgress = styled(CircularProgress)`
  color: var(--color-black) !important;
`

const StyledCircularProgress = ({ size }: { size?: number }) => (
  <CustomCircularProgress size={size ?? undefined} />
)

StyledCircularProgress.defaultProps = {
  size: undefined,
}

export default StyledCircularProgress

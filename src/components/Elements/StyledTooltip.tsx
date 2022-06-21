import { Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomTooltip = styled(({ className, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: `var(--color-black)`,
  },
}))

const StyledTooltip = ({
  children,
  title,
}: {
  children: JSX.Element
  title: string
}) => <CustomTooltip title={title}>{children}</CustomTooltip>

export default StyledTooltip

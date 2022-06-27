import { Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomTooltip = styled(({ title, children }: { title: string, children: JSX.Element }) => (
  <Tooltip title={title}>{children}</Tooltip>
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

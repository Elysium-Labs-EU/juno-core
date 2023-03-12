import Badge from '@mui/material/Badge'
import styled from 'styled-components'

import { breakPoint } from 'constants/themeConstants'

export const Wrapper = styled.div`
  margin-bottom: var(--spacing-7);
  @media only screen and (min-width: ${breakPoint.xl}) {
    margin-top: var(--spacing-6);
  }
`

export const AttachmentHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: #1c1c1c !important;
  }
`

export const AttachmentHeader = styled.p`
  margin: 0;
  margin-bottom: var(--spacing-2);
  margin-right: var(--spacing-1);
`

export const UploadedFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -(var(--spacing-1));
`

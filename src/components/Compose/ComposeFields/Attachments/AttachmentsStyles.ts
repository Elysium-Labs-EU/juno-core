import styled from 'styled-components'
import Badge from '@mui/material/Badge'

export const Wrapper = styled.div`
  margin-top: 40px;
`

export const AttachmentHeaderContainer = styled.div`
  display: flex;
  flex-flow: row;
`

export const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: #1c1c1c !important;
  }
`

export const AttachmentHeader = styled.p`
  margin: 0;
  margin-bottom: 20px;
  margin-right: 10px;
`

export const UploadedFiles = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
`

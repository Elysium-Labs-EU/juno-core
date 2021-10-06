import React from 'react'
import { CircularProgress } from '@material-ui/core'
import * as ES from '../EmailDetailStyles'
import * as S from './FilesOverviewStyles'
import EmailAttachment from '../Attachment/EmailAttachment'
import { EmailListThreadItem } from '../../../Store/emailListTypes'

interface Props {
  threadDetail: EmailListThreadItem | null
  isLoading: boolean
}

const FilesOverview = (props: Props) => {
  const { threadDetail, isLoading } = props

  const files = () => {
    if (threadDetail && threadDetail.messages && !isLoading) {
      return (
        <EmailAttachment
          message={threadDetail.messages[threadDetail.messages.length - 1]}
          overview
        />
      )
    }
    return null
  }

  return (
    <ES.DetailRow>
      <ES.EmailDetailContainer>
        <S.FilesWrapper>
          {files() && !isLoading && files()}
          {isLoading && <CircularProgress />}
        </S.FilesWrapper>
      </ES.EmailDetailContainer>
    </ES.DetailRow>
  )
}

export default FilesOverview

import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { CircularProgress } from '@material-ui/core'
import * as ES from '../EmailDetailStyles'
import * as S from './FilesOverviewStyles'
import EmailAttachment from '../Attachment/EmailAttachment'

const FilesOverview = (props) => {
  const { threadDetail, isLoading } = props

  const files = () => {
    if (threadDetail && !isEmpty(threadDetail) && !isLoading) {
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

import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { CircularProgress } from '@material-ui/core'
import * as ES from '../EmailDetailStyles'
import * as S from './FilesOverviewStyles'
import * as local from '../../../constants/filesOverviewConstants'
import EmailAttachment from '../Attachment/EmailAttachment'

const FilesOverview = (props) => {
  const { threadDetail, isLoading } = props
  const files =
    threadDetail &&
    !isEmpty(threadDetail) &&
    !isLoading &&
    threadDetail.messages.map((message, index) => {
      return (
        <EmailAttachment
          key={`${message.id + index}`}
          message={message}
          overview
        />
      )
    })

  return (
    <ES.DetailRow>
      <ES.EmailDetailContainer>
        <S.FilesWrapper>
          {files && !isLoading && files.length > 0 ? (
            files
          ) : (
            <p>{local.NO_FILES}</p>
          )}
          {isLoading && <CircularProgress />}
        </S.FilesWrapper>
      </ES.EmailDetailContainer>
    </ES.DetailRow>
  )
}

export default FilesOverview

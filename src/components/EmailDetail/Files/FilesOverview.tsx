import CircularProgress from '@mui/material/CircularProgress'
import * as ES from '../EmailDetailStyles'
import * as S from './FilesOverviewStyles'
import * as local from '../../../constants/filesOverviewConstants'
import EmailAttachment from '../Attachment/EmailAttachment'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'

interface IFilesOverview {
  threadDetail: IEmailListThreadItem | null
  isLoading: boolean
}

const FilesOverview = (props: IFilesOverview) => {
  const { threadDetail, isLoading } = props

  const files = () => {
    if (threadDetail && threadDetail.messages) {
      return threadDetail.messages.map((message) => (
        <EmailAttachment key={message.id} message={message} />
      ))
    }
    return <span>{local.NO_FILES}</span>
  }

  const staticFiles = files()

  return (
    <ES.DetailRow>
      <ES.EmailDetailContainer>
        <S.FilesWrapper>
          {staticFiles && !isLoading && staticFiles}
          {isLoading && <CircularProgress />}
        </S.FilesWrapper>
      </ES.EmailDetailContainer>
      <ES.EmailOptionsPlaceholder />
    </ES.DetailRow>
  )
}

export default FilesOverview

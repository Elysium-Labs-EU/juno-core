import { selectIsForwarding, selectIsReplying } from 'store/emailDetailSlice'
import { useAppSelector } from 'store/hooks'
import { Span } from 'styles/globalStyles'
import countUniqueFiles from 'utils/countUniqueFiles/countUniqueFiles'

import { NO_FILES } from './FilesOverviewConstants'
import * as S from './FilesOverviewStyles'
import MappedFiles from './MappedFiles'
import * as ES from '../EmailDetailStyles'
import type { IFilesOverview } from '../EmailDetailTypes'

const FilesOverview = ({ threadDetail }: IFilesOverview) => {
  const isReplying = useAppSelector(selectIsReplying)
  const isForwarding = useAppSelector(selectIsForwarding)

  return (
    <ES.EmailDetailContainer tabbedView={isReplying || isForwarding}>
      <S.FilesWrapper>
        {threadDetail && countUniqueFiles(threadDetail) > 0 ? (
          <MappedFiles threadDetail={threadDetail} />
        ) : (
          <Span data-test-id="no-files-overview">{NO_FILES}</Span>
        )}
      </S.FilesWrapper>
    </ES.EmailDetailContainer>
  )
}

export default FilesOverview

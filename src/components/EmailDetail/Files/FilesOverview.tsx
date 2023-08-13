import { Span } from 'styles/globalStyles'
import countUniqueFiles from 'utils/countUniqueFiles/countUniqueFiles'

import { NO_FILES } from './FilesOverviewConstants'
import * as S from './FilesOverviewStyles'
import MappedFiles from './MappedFiles'
import * as ES from '../EmailDetailStyles'
import type { IFilesOverview } from '../EmailDetailTypes'

const FilesOverview = ({ threadDetail }: IFilesOverview) => {
  return (
    <ES.EmailDetailContainer>
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

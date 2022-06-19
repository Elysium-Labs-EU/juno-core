import { FiShield } from 'react-icons/fi'
import { Tooltip } from '@mui/material'
import * as S from './RemovedTrackersStyles'
import * as GS from '../../../../styles/globalStyles'
import * as themeConstants from '../../../../constants/themeConstants'

const REMOVED_TRACKERS = 'Trackers removed'
const JUNO_TRACKERS = 'Juno has blocked trackers on the email.'

const RemovedTrackers = () => (
  <S.Wrapper>
    <S.Inner>
      <S.Icon>
        <FiShield size={10} color={themeConstants.colorGrey} />
      </S.Icon>
      <Tooltip title={JUNO_TRACKERS}>
        <GS.TextSpanSmall>{REMOVED_TRACKERS}</GS.TextSpanSmall>
      </Tooltip>
    </S.Inner>
  </S.Wrapper>
)

export default RemovedTrackers
